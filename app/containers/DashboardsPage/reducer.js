import * as DashboardTypes from './constants';

import * as ChartTypes from '../../components/charts/Chart/constants';

const options = {
  lock: {
    isResizable: false,
    isDraggable: false
  },
  unlock: {
    isResizable: true,
    isDraggable: true
  }
};

const initialState = [];
let widgetsAmount = -1;

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case DashboardTypes.ADD_ITEM: {
      const { data } = action.payload;
      const maxH = data.type === ChartTypes.TEXT_CHART ? 1 : undefined;
      let minW = data.type === ChartTypes.TEXT_CHART ? 12 : undefined;
      minW = data.type === ChartTypes.PIE_CHART ? 2 : minW;
      widgetsAmount += 1;
      const layout = [
        ...state,
        {
          ...data,
          name: 'Widget Name',
          i: `n${widgetsAmount}`,
          w: minW || 3,
          h: maxH || 2,
          minW: minW || 3,
          minH: 2,
          isDraggable: true,
          isResizable: true,
          maxH
        }
      ];
      return layout;
    }
    // case DashboardTypes.REMOVE_ITEM: {
    //   const { ind } = action.payload;
    //   return {
    //     ...state,
    //     layout: state.layout.filter(({ i }) => i !== ind)
    //   };
    // }
    // case DashboardTypes.UPDATE_WIDGET: {
    //   const { ind, data } = action.payload;
    //   return {
    //     ...state,
    //     layout: state.layout.map((widget) => {
    //       if (widget.i === ind) {
    //         return { ...widget, ...data };
    //       }
    //       return widget;
    //     })
    //   };
    // }
    case DashboardTypes.UPDATE_LAYOUT: {
      const { layouts } = action.payload;
      const { lg } = layouts;

      const settings = state && state.map((item) => {
        if (item.settings) {
          for (let i = 0; i < lg.length; i += 1) {
            const l = item.settings && item.settings.layouts && item.settings.layouts.lg && item.settings.layouts.lg.i;
            if (lg[i].i === l) {
              const { type } = item.settings.layouts && item.settings.layouts.lg;
              const lts = item.settings.layouts;
              return {
                ...item,
                settings: {
                  layouts: {
                    ...lts,
                    lg: {
                      ...lg[i],
                      type,
                      name: item.title
                    }
                  },
                  data: item.settings.data
                }
              };
            }
          }
        }
        return item;
      });

      return settings;
    }
    case DashboardTypes.LOCK: {
      const layout = state.map((item) => ({
        ...item,
        settings: {
          layouts: {
            lg: {
              ...item.settings.layouts && item.settings.layouts.lg,
              ...(action.payload.lock || action.payload.breakpoint === 'xxs' ? options.lock : options.unlock)
            }
          },
          data: item.settings.data
        }
      })
      );
      return layout;
    }
    case DashboardTypes.ONE_DASHBOARD_RECEIVED: {
      const { widgets } = action.payload.data;

      const layouts = JSON.parse(action.payload.data && action.payload.data.layouts);

      const settings = widgets && widgets.map((item) => (
        {
          ...item,
          settings: item.settings ? JSON.parse(item.settings) : item
        }
      ));

      widgetsAmount = settings.length > 0 ? +(settings[settings.length - 1].settings.layouts.lg.i.slice(1)) : -1;
      const newLayouts = settings && settings.map((item) => {
        if (item.settings) {
          for (let i = 0; i < layouts.lg.length; i += 1) {
            const l = item.settings && item.settings.layouts && item.settings.layouts.lg && item.settings.layouts.lg.i;
            if (layouts.lg[i].i === l) {
              const { type } = item.settings.layouts && item.settings.layouts.lg;
              const lts = item.settings.layouts;
              return {
                ...item,
                settings: {
                  layouts: {
                    ...lts,
                    lg: {
                      ...layouts.lg[i],
                      type,
                      name: item.title
                    }
                  },
                  data: item.settings.data
                }
              };
            }
          }
        }
        return item;
      });

      return newLayouts;
    }

    case DashboardTypes.ADD_WIDGET_RECEIVED: {
      const { data } = action.payload;

      const settings = JSON.parse(data.settings);
      const newData = data;
      newData.settings = settings;
      newData.sensor = settings && settings.data && settings.data.sensor;

      const widgets = state.slice();
      widgets[widgets.length - 1] = { ...newData };

      return widgets;
    }

    case DashboardTypes.UPDATE_WIDGET_RECEIVED: {
      const { data, id } = action.payload;
      let ind = null;
      state.map((item, index) => {
        if (item.id === id) {
          ind = index;
        }
        return item;
      });

      const settings = JSON.parse(data.settings);
      const newData = data;
      newData.settings = settings;
      newData.sensor = data.sensor_id;

      const widgets = state.slice();
      widgets[ind] = { ...widgets[ind], ...newData };

      return widgets;
    }

    case DashboardTypes.REMOVE_WIDGET_RECEIVED: {
      const { id: removedId } = action.payload;
      return state.filter(({ id }) => id !== removedId);
    }

    case DashboardTypes.GET_WIDGET_RECEIVED: {
      const { id } = action.payload.data;
      const newWidgets = state && state.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            alert_rule: action.payload.data && action.payload.data.alert_rule && action.payload.data.alert_rule
          };
        }
        return item;
      });
      return newWidgets;
    }

    case DashboardTypes.CANCEL_WIDGET: {
      const widgets = state.slice();
      widgets.splice(widgets.length - 1, 1);
      return widgets;
    }

    case DashboardTypes.CLEAN_LAYOUT: {
      return initialState;
    }
    default: {
      return state;
    }
  }
};

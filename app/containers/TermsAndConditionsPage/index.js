import React, { Fragment } from 'react';

import Header from '../../components/Header';
import Footer from '../../components/Footer';

const TermsAndConditions = () => (
  <Fragment>
    <Header topbar={false} />
    <div className="m-grid__item m-grid__item--fluid m-grid m-grid--ver-desktop m-grid--desktop m-body terms">
      <div className="m-grid__item m-grid__item--fluid m-wrapper">
        <div className="m-subheader ">
          <div className="d-flex align-items-center">
            <div className="mr-auto">
              <h3 className="m-subheader__title ">
                End User License Agreement
              </h3>
            </div>
          </div>
        </div>
        <div className="m-content">
          <div className="row">
            <div className="col-md-12">
              <div className="m-portlet m-portlet--full-height m-portlet--tabs m-portlet-pb">
                {/* <div className="m-portlet__head">
                  <div className="m-form m-form--label-align-right m--margin-top-30 m--margin-bottom-30">
                    <div className="row align-items-center">
                      <div className="col-xl-8 order-2 order-xl-1">
                        <div className="form-group m-form__group row align-items-center">
                          <div className="col-md-4">
                            <div className="m-input-icon m-input-icon--left">
                              End User License Agreement
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div> */}
                <div className="m-portlet__body">
                  <div className="m_datatable m-datatable m-datatable--default m-datatable--subtable  m-datatable--loaded" id="local_data">
                    <p>IMPORTANT– READ CAREFULLY: This End-User License Agreement ("EULA") is between You (either an individual, a legal entity or any affiliated companies or other entities) and Viking SCADA LLC, ("Viking SCADA"). The EULA authorizes You to use the Licensed Software, specified in Clause 1 below, under the terms and conditions set forth below. Read this EULA carefully before installing or using the Licensed Software. By installing, copying, and/or using the Licensed Software, You acknowledge that You:</p>
                    <ul>
                      <li>(1) have read and understood the EULA as well as each of the third party licenses, Open Source Software licenses and additional terms set forth. </li>
                      <li>(2) agree to be bound by all of the terms and conditions for this EULA and such Additional Terms. </li>
                    </ul>
                    <p>You further agree that if Viking SCADA or any licensor of Viking SCADA is required to engage in any proceeding, legal or otherwise, to enforce their rights under this EULA, Viking SCADA and/or its licensor shall be entitled to recover from You, in addition to any other sums due, reasonable attorney’s fees, costs and disbursements. If You do not agree to all of the terms and conditions of this EULA, Viking SCADA is unwilling to license the Licensed Software to you. In such an event, you should not install the Licensed Software and promptly contact Viking SCADA for instructions on return of the Licensed Software. This EULA governs any Updates, releases, revisions, or enhancements to the Licensed Software. </p>
                    <p>1. LICENSED SOFTWARE. As used in this EULA, the term "Licensed Software" means (i) the software offered by Viking SCADA under in its brand in any release and (ii) any related electronic or written documentation for the Licensed Software. </p>
                    <p>2. INTELLECTUAL PROPERTY RIGHTS NOTICE. The Licensed Software and all rights, without limitation including proprietary rights therein, are owned by Viking SCADA, their licensors or affiliates and are protected by international treaty provisions and all applicable national laws. The structure, organization, and code of the Licensed Software are the valuable trade secrets and confidential information of Viking SCADA, their licensors or affiliates. Except as expressly and unambiguously provided herein, You do not possess, and Viking SCADA does not grant to You, any express or implied rights (whether by implication, estoppels or other legal theory) in or to any such intellectual property rights and all such rights are retained by Viking SCADA, its licensors or affiliates. You must reproduce and include the copyright notices with any permitted copies You make of the Licensed Software. </p>
                    <p>3. LICENSE GRANT AND USE RESTRICTIONS. The Licensed Software is not sold to You. Viking SCADA only grants to You a non-exclusive, non-transferable license to use the Licensed Software in object code solely for your own use. The configuration and execution of the Licensed Software is supervised by a hardware dongle with a license key or a PCbound copy protection, supplied separately for the Licensed Software. </p>
                    <p>4. LIMITATIONS ON LICENSE. You may not copy, distribute, or make derivative works of the Licensed Software except as follows:</p>
                    <ul>
                      <li>(a) You may make one copy of the Licensed Software, excluding the documentation, as an archival backup copy of the original. Any other copies You make of the Licensed Software are in violation of this EULA. </li>
                      <li>(b) You may not use, modify, or transfer the right to use the Licensed Software other than together with the accompanying hardware or copy the Licensed Software except as expressly provided in this EULA. </li>
                      <li>(c) You may not sublicense, rent or lease the Licensed Software. </li>
                      <li>(d) You may not or direct any third party to reverse engineer, de-compile, or disassemble those Licensed Software programs except and only to the extent that such activity is expressly permitted by applicable law notwithstanding this limitation. </li>
                      <li>(e) This EULA does not grant You any rights whatsoever in relation to the trademarks or service marks of Viking SCADA, Viking SCADA AG or either’s affiliates. </li>
                      <li>(f) Parts of the Licensed Software may be supplied by third parties and may be subject to separate license terms. In the event that you receive the terms and conditions stipulated by the relevant Licensor together with the Software, such terms and conditions shall apply with respect to the Licensor’s liability towards you. Viking SCADA own liability to you is governed by this EULA. </li>
                      <li>(g) The Licensed Software contains Open Source Software (hereinafter referred to as “OSS”). You are entitled to use the OSS in accordance with the respective license conditions of the OSS. The license conditions of the respective OSS shall prevail over this EULA with respect to the OSS. If the license conditions of the OSS require the distribution of the source code of such OSS Viking SCADA shall provide such source code on request against payment of the shipping and handling charges. </li>
                      <li>(h) The following additional restrictions in the use of this Licensed Software thus apply. </li>
                    </ul>
                    <p>This Licensed Software may not be sold, sub-licensed or otherwise disposed of as an independent product offering. Neither you, nor your customers or your Original Equipment Manufacturers may use this Licensed Software or parts thereof as a standard SCADA system. Any product including its documentation developed by using this Licensed Software has also to be marked "Developed using Viking SCADA SOFTWARE”. MISUSE OF THE LICENSED SOFTWARE OR DATA GENERATED BY THE LICENSED SOFTWARE IS STRICTLY PROHIBITED BY LICENSOR, MAY VIOLATE U.S. AND OTHER LAWS AND MAY SUBJECT YOU TO SUBSTANTIAL LIABILITY. You are solely responsible for any misuse of the Licensed Software under this EULA and for any liability or damage related in any way to your use of the Licensed Software in violation of this EULA. You are also responsible for using the Licensed Software in accordance with the limitations of this EULA. </p>
                    <p>5. TERMINATION. This EULA is effective from the first date You install, copy or otherwise use the Licensed Software. You may terminate this license at any time by deleting or destroying the Licensed Software, all back up copies and all related materials provided to You by Viking SCADA. Your license rights terminate automatically and immediately without notice if You fail to comply with any provision of this EULA. </p>
                    <p>6. WARRANTY DISCLAIMER. YOU ACKNOWLEDGE THE LICENSED SOFTWARE IS PROVIDED "AS IS" AND NEITHER VIKING SCADA NOR ANY OF THEIR LICENSORS MAKE ANY REPRESENTATIONS OR WARRANTIES, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY OR FITNESS FOR A PARTICULAR PURPOSE OR THAT THE LICENSED SOFTWARE WILL NOT INFRINGE ANY THIRD PARTY PATENTS, COPYRIGHTS, TRADEMARKS OR OTHER RIGHTS. THERE IS NO WARRANTY BY VIKING SCADA OR THEIR LICENSORS OR BY ANY OTHER PARTY THAT THE FUNCTIONS CONTAINED IN THE LICENSED SOFTWARE WILL MEET YOUR REQUIREMENTS OR THAT THE OPERATION OF THE SOFTWARE WILL BE UNINTERRUPTED OR ERROR-FREE. NO ORAL OR WRITTEN INFORMATION OR ADVICE GIVEN BY A VIKING SCADA REPRESENTATIVE SHALL CREATE A WARRANTY OR IN ANY WAY AFFECT THIS DISCLAIMER. YOU ASSUME ALL RESPONSIBILITY TO ACHIEVE YOUR INTENDED RESULTS AND FOR THE INSTALLATION, USE, AND RESULTS OBTAINED FROM IT. </p>
                    <p>7. NO OTHER OBLIGATIONS; RESERVATION OF RIGHTS. This EULA creates no obligations on the part of Viking SCADA other than as specifically set forth herein. Viking SCADA reserves all rights not expressly granted to You in this EULA. </p>
                    <p>8. YOU ARE SOLELY RESPONSIBLE TO ENSURE THAT (a) the system on which the Licensed Software is installed, run and/or used contains all 3rd party software necessary to run, install and/or use the Licensed Software, and (b) You and/or Your system fulfill the requirements of all required 3rd party licenses. VIKING SCADA IS NOT RESPONSIBLE TO ENSURE THAT ANY AND ALL SOFTWARE NECESSARY TO RUN, INSTALL AND/OR USE THE LICENSED SOFTWARE IS INSTALLED ON YOUR SYSTEM EXCEPT WHERE THE CONTRARY IS AGREED WITH YOU IN WRITING. IN NO EVENT SHALL VIKING SCADA BE LIABLE FOR THE CORRECT LICENSING OF THE 3RD PARTY SOFTWARE INSTALLED ON YOUR SYSTEM. </p>
                    <p>9. LIMITATION OF LIABILITY. IN NO EVENT SHALL VIKING SCADA, ITS EMPLOYEES, LICENSORS, AFFILIATES OR AGENTS BE LIABLE FOR ANY LOST PROFITS OR COSTS OF PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES, PROPERTY DAMAGE, LOSS OF PROFITS, INTERRUPTION OF BUSINESS OR FOR ANY SPECIAL, INDIRECT, INCIDENTAL, ECONOMIC, PUNITIVE OR CONSEQUENTIAL DAMAGES, HOWEVER CAUSED, AND WHETHER ARISING UNDER CONTRACT, TORT, NEGLIGENCE, OR OTHER THEORY OF LIABILITY, OR ARISING OUT OF THE USE OF OR INABILITY TO USE THE LICENSED SOFTWARE, EVEN IF VIKING SCADA IS ADVISED OF THE POSSIBILITY OF SUCH DAMAGES. THE LIMITATION OF LIABILITY SHALL NOT APPLY IF AND TO THE EXTENT SIEMEN'S LIABILITY IS MANDATORY UNDER THE APPLICABLE LAW E.G. PRODUCT LIABILITY LAW OR INTENSIONAL MISCONDUCT. </p>
                    <p>10. TECHNICAL SUPPORT AND AUDIT Viking SCADA and its affiliates have no obligation to furnish You with technical support unless separately agreed in writing between You and Viking SCADA. Viking SCADA and where applicable their licensors in the Licensed Software shall be free to use any feedback and/or technical data including audit data received from You resulting from your access to and use of the Licensed Software for any purpose including (without limitation) the manufacture, marketing and maintenance or support of products and services. If and insofar as permissible under the relevant laws You permit Viking SCADA and its affiliates to audit the use of the Licensed Software and will give assistance and access to the necessary information. </p>
                    <p>11. EXPORT CONTROL. You agree, to the extent required by U.S. Export Administration Regulations, that You shall not disclose or otherwise export or re-export the Licensed Software or any part thereof delivered under this EULA to any country (including a national or resident of such country) to which the U.S. has restricted or prohibited the export of goods or services. You represent and warrant that You are not (i) located in any country that is subject to a U.S. Government embargo, or that has been designated by the U.S. Government as a "terrorist sponsoring" country, or (ii) listed on any U.S. Government list of prohibited or restricted parties including the Treasury Department's list of Specially Designated Nationals or the U.S. Department of Commerce Denied Person's List or Entity List. </p>
                    <p>12. DATA PROTECTION: You acknowledge that Viking SCADA uses a software based solution for administration of data and license information. You agree that Viking SCADA stores and uses all data and information required for the business relationship between You and Viking SCADA or resulting from said relationships, especially but not limited to contractual documents and papers as well as data and information of and about You and Your auxiliary persons necessary for the performance of the contract. Such information may be stored and used in and outside USA. Furthermore, all this data and information may be disclosed to Viking SCADA AG as well as to their associated companies for corresponding processing, especially for providing services, fulfillment of legal requirements or for Viking SCADA internal audit and/or supervisory requirements; this always in compliance with respectively applicable data protection laws. </p>
                    <p>13. FOR U.S. GOVERNMENT END USERS: The Licensed Software was developed at private expense and each component thereof is a “commercial item” as that term is defined at 48 C.F.R. 2.101, consisting of “commercial computer software” and “commercial computer software documentation” as such terms are used in 48 C.F.R. 12.212 and FAR 52.227-19 Commercial Computer Software License. The Uniform Computer Information Transactions Act is excluded. Consistent with 48 C.F.R. 12.212 and 48 C.F.R. 227.7202-1 through 227.7202-4, all U.S. Government end users acquire the Licensed Software with only those limited rights set forth therein. Publisher is Viking SCADA LLC, 3235 S Harvard Ave, Tulsa, OK 74135. </p>
                    <p>14. APPLICABLE LAW AND FORUM. This EULA is governed by the laws of USA. No choice of law rules of any jurisdiction will apply. Any disputes arising out of or relating to this EULA shall be settled by the courts in USA to the extent permitted by mandatory law. </p>
                    <p>15. MISCELLANEOUS. Unless Viking SCADA has given separate individual contract conditions in writing this EULA represents the entire agreement between You and Viking SCADA relating to the Licensed Software and (i) supersedes all prior or contemporaneous oral or written communications, proposals, and representations with respect to its subject matter; and (ii) prevails over any conflicting or additional terms of any acknowledgement or similar communication between the parties during the term of this License. Notwithstanding the foregoing, some products of Viking SCADA may require You to agree to additional terms through an on-line "click-wrap" license, and such terms shall supplement this EULA. If any provision of this EULA is held invalid, all other provisions shall remain valid unless such validity would frustrate the purpose of this EULA, and this EULA shall be enforced to the full extent allowable under applicable law. No modification to this EULA is binding, unless in writing and signed by a duly authorized representative of each party. This EULA shall be binding on and shall inure to the benefit of the heirs, successors, and assigns of the parties hereto. The failure of either party to enforce any right resulting from the breach of any provision of this EULA by the other party will not be deemed a waiver of any right related to a subsequent breach of such provision or any other right hereunder. </p>
                    <br />
                    <p className="text-center">© Viking SCADA LLC {new Date().getFullYear()}</p>
                    <p className="text-center">All rights reserved</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer />
  </Fragment>
);

export default TermsAndConditions;

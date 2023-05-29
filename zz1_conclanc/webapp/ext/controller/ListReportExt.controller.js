var controller;

sap.ui.define([
    "sap/m/MessageToast",
    'sap/m/SearchField',
    'sap/ui/model/type/String',
    'sap/ui/table/Column',
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",    
    "sap/ui/core/Fragment",  
], function(MessageToast, SearchField, TypeString, UIColumn, Filter, FilterOperator, MessageType, Fragment) {
    'use strict';
    var oMessageTemplate;
    return {
        PopupCriarDoc: function(oEvent) {
            var oTriggerButton;
            controller = this;
            this.initLocalModel();

            /* =================================================================== 
            Configura Serviço OData onde será extraído os dados
            =================================================================== */
            var vServiceUrl = "/sap/opu/odata/sap/ZGW_S2P_CONCILIADIR_LANC_NF_SRV/";
            var oDataModel = new sap.ui.model.odata.ODataModel(vServiceUrl, false);
            var oView = sap.ui.getCore().byId('br.com.ale.zz1conclanc::sap.suite.ui.generic.template.ListReport.view.ListReport::ZC_S2P_CONC_LANC_APP--page');
            var oViewModel = oView.getModel("local");


            /* =================================================================== 
            Cria os campos do  Popup
            =================================================================== */

            var IRemArmaz = new sap.m.ComboBox("DDB1");
            IRemArmaz.setWidth("100%");

            IRemArmaz.addEventDelegate({
                onAfterRendering: function() {
                    IRemArmaz.$().find("input").attr("readonly", true);
                }
            });

            var IJustificativa = new sap.m.ComboBox("DDB2");
            IJustificativa.setWidth("100%");

            IJustificativa.addEventDelegate({
                onAfterRendering: function() {
                    IJustificativa.$().find("input").attr("readonly", true);
                }
            });


            var ICentroOrig = new sap.m.Input({
                type: sap.m.InputType.Text,
                showValueHelp: true,
                valueHelpRequest: [this.onValueHelpCentroOrigem, this],
                minLength: 4,
                maxLength: 4
            });
            var ICentroDest = new sap.m.Input({
                type: sap.m.InputType.Text,
                showValueHelp: true,
                valueHelpRequest: [this.onValueHelpCentroDestino, this],
                minLength: 4,
                maxLength: 4
            });
            var INotaFiscal = new sap.m.Input({
                type: sap.m.InputType.Text,
                minLength: 1,
                maxLength: 9
            });
            var ISerie = new sap.m.Input({
                type: sap.m.InputType.Text,
                minLength: 1,
                maxLength: 3
            });
            var IDataNotaFiscal = new sap.m.DatePicker("IDataNotaFiscal", {
                displayFormat: "dd/MM/yyyy",
                valueFormat: "yyyyMMdd",
                value: {
                    path: "displayDate"
                }
            });
            var IParcDest = new sap.m.Input({
                type: sap.m.InputType.Text,
                minLength: 1,
                maxLength: 10
            });
            var IMaterial = new sap.m.Input({
                type: sap.m.InputType.Text,
                showValueHelp: true,
                valueHelpRequest: [this.onValueHelpMaterial, this],
                minLength: 1,
                maxLength: 40
            });
            var IQtd = new sap.m.Input({
                type: sap.m.InputType.Text
            });
            var IGrpCompras = new sap.m.Input({
                type: sap.m.InputType.Text,
                showValueHelp: true,
                valueHelpRequest: [this.onValueHelpGrpCompras, this],
                minLength: 1,
                maxLength: 3
            });
            var IDepEntrada = new sap.m.Input({
                type: sap.m.InputType.Text,
                showValueHelp: true,
                valueHelpRequest: [this.onValueHelpDepositoEntrada, this],
                minLength: 1,
                maxLength: 4
            });
            var IDepSaida = new sap.m.Input({
                type: sap.m.InputType.Text,
                showValueHelp: true,
                valueHelpRequest: [this.onValueHelpDepositoSaida, this],
                minLength: 1,
                maxLength: 4
            });
            var IPrecoNotaFiscal = new sap.m.Input({
                type: sap.m.InputType.Text
            });
            var IDataRemessa = new sap.m.DatePicker("IDataRemessa", {
                displayFormat: "dd/MM/yyyy",
                valueFormat: "yyyyMMdd",
                value: {
                    path: "displayDate"
                }
            });

            var ITransporte = new sap.m.ComboBox("DDB3");

            var Oitem1 = new sap.ui.core.ListItem("S");
            Oitem1.setText("Sim");
            ITransporte.addItem(Oitem1);

            var Oitem2 = new sap.ui.core.ListItem("N");
            Oitem2.setText("Não");
            ITransporte.addItem(Oitem2);

            ITransporte.setWidth("100%");

            ITransporte.addEventDelegate({
                onAfterRendering: function() {
                    ITransporte.$().find("input").attr("readonly", true);
                }
            });

            var IIncoterms = new sap.m.Input({
                type: sap.m.InputType.Text,
                showValueHelp: true,
                valueHelpRequest: [this.onValueHelpInco, this],
                minLength: 1,
                maxLength: 3
            });
            var IVeiculo = new sap.m.Input({
                type: sap.m.InputType.Text,
                showValueHelp: true,
                valueHelpRequest: [this.onValueHelpVeiculo, this],
                minLength: 1,
                maxLength: 10
            });
            var IMotorista = new sap.m.Input({
                type: sap.m.InputType.Text,
                showValueHelp: true,
                valueHelpRequest: [this.onValueHelpMotorista, this],
                minLength: 1,
                maxLength: 40
            });
            var ICfop = new sap.m.Input({
                type: sap.m.InputType.Text,
                minLength: 1,
                maxLength: 10
            });

            var TRemArmaz = new sap.m.Text({
                text: "Tipo de Processo"
            });
            var TJustificativa = new sap.m.Text({
                text: "Justificativas dos Empréstimos"
            });
            var TCentroOrig = new sap.m.Text({
                text: "Centro Origem"
            });
            var TCentroDest = new sap.m.Text({
                text: "Centro Destino"
            });
            var TNotaFiscal = new sap.m.Text({
                text: "Nota Fiscal"
            });
            var TSerie = new sap.m.Text({
                text: "Série"
            });
            var TDataNotaFiscal = new sap.m.Text({
                text: "Data Nota Fiscal"
            });
            var TParcDest = new sap.m.Text({
                text: "Parceiro Destinatário"
            });
            var TMaterial = new sap.m.Text({
                text: "Material"
            });
            var TQtd = new sap.m.Text({
                text: "Quantidade"
            });
            var TGrpCompras = new sap.m.Text({
                text: "Grupo de Compras"
            });
            var TDepEntrada = new sap.m.Text({
                text: "Depósito de Entrada"
            });
            var TDepSaida = new sap.m.Text({
                text: "Depósito de Saída"
            });
            var TPrecoNotaFiscal = new sap.m.Text({
                text: "Preço Nota Fiscal"
            });
            var TDataRemessa = new sap.m.Text({
                text: "Data da Remessa"
            });
            var TTransporte = new sap.m.Text({
                text: "Transporte"
            });
            var TIncoterms = new sap.m.Text({
                text: "Incoterms"
            });
            var TVeiculo = new sap.m.Text({
                text: "Veículo"
            });
            var TMotorista = new sap.m.Text({
                text: "Motorista"
            });
            var TCfop = new sap.m.Text({
                text: "CFOP"
            });

            oViewModel.setProperty("/Campos/IRemArmaz", IRemArmaz);
            oViewModel.setProperty("/Campos/IJustificativa", IJustificativa);
            oViewModel.setProperty("/Campos/ICentroOrig", ICentroOrig);
            oViewModel.setProperty("/Campos/ICentroDest", ICentroDest);
            oViewModel.setProperty("/Campos/INotaFiscal", INotaFiscal);
            oViewModel.setProperty("/Campos/ISerie", ISerie);
            oViewModel.setProperty("/Campos/IDataNotaFiscal", IDataNotaFiscal);
            oViewModel.setProperty("/Campos/IParcDest", IParcDest);
            oViewModel.setProperty("/Campos/IMaterial", IMaterial);
            oViewModel.setProperty("/Campos/IQtd", IQtd);
            oViewModel.setProperty("/Campos/IGrpCompras", IGrpCompras);
            oViewModel.setProperty("/Campos/IDepEntrada", IDepEntrada);
            oViewModel.setProperty("/Campos/IDepSaida", IDepSaida);
            oViewModel.setProperty("/Campos/IPrecoNotaFiscal", IPrecoNotaFiscal);
            oViewModel.setProperty("/Campos/IDataRemessa", IDataRemessa);
            oViewModel.setProperty("/Campos/ITransporte", ITransporte);
            oViewModel.setProperty("/Campos/IIncoterms", IIncoterms);
            oViewModel.setProperty("/Campos/IVeiculo", IVeiculo);
            oViewModel.setProperty("/Campos/IMotorista", IMotorista);
            oViewModel.setProperty("/Campos/ICfop", ICfop);

            //ILinha.setEditable(false);

            //ILinha.setValue(aData.linha);

            /* =================================================================== 
				Busca dados dos Value Helps
			=================================================================== */
            oDataModel.read("/VhTipoProcessoSet", {
                //Se deu certo
                success: function(oData, response) {

                    for (var i = 0; i < oData.results.length; i++) {

                        var Oitem1 = new sap.ui.core.ListItem(oData.results[i].IdTipo);
                        Oitem1.setText("("+oData.results[i].IdTipo+") "+oData.results[i].TipoDescr);
                        IRemArmaz.addItem(Oitem1)

                    }

                }.bind(this),
                //Se deu erro.
                error: function(oError) {}.bind(this)
            });

            oDataModel.read("/VhJustificativaSet", {
                //Se deu certo
                success: function(oData, response) {

                    for (var i = 0; i < oData.results.length; i++) {

                        var Oitem2 = new sap.ui.core.ListItem("Just"+i);
                        Oitem2.setText("("+oData.results[i].IdJustif+") "+oData.results[i].JustifDescr);
                        IJustificativa.addItem(Oitem2)

                    }

                }.bind(this),
                //Se deu erro.
                error: function(oError) {}.bind(this)
            });

            oDataModel.read("/VhCentroSet", {
                //Se deu certo
                success: function(oData, response) {
                    //Define um model do tipo Json.

                    var aCentro = [];

                    for (var i = 0; i < oData.results.length; i++) {

                        aCentro[i] = {
                            Werks: oData.results[i].Werks, 
                            Name1: oData.results[i].Name1,
                        } 

                    }

                    var oDataNew = new sap.ui.model.json.JSONModel({
                        "results": aCentro
                    });

                    //Seta o model a tela com o nome de síntese, dessa maneira os dados não serão buscados ao entrar na tela.
                    this.getView().setModel(oDataNew, "Centro");

                }.bind(this),
                //Se deu erro.
                error: function(oError) { }.bind(this)
            });

            oDataModel.read("/VhMaterialSet", {
                //Se deu certo
                success: function(oData, response) {
                    //Define um model do tipo Json.

                    var aMaterial = [];

                    for (var i = 0; i < oData.results.length; i++) {

                        aMaterial[i] = {
                            Matnr: oData.results[i].Matnr, 
                            Maktx: oData.results[i].Maktx,
                        } 

                    }

                    var oDataNew = new sap.ui.model.json.JSONModel({
                        "results": aMaterial
                    });

                    //Seta o model a tela com o nome de síntese, dessa maneira os dados não serão buscados ao entrar na tela.
                    this.getView().setModel(oDataNew, "Material");

                }.bind(this),
                //Se deu erro.
                error: function(oError) { }.bind(this)
            });

            oDataModel.read("/VhDepositoSet", {
                //Se deu certo
                success: function(oData, response) {
                    //Define um model do tipo Json.

                    var aDeposito = [];

                    for (var i = 0; i < oData.results.length; i++) {

                        aDeposito[i] = {
                            Lgort: oData.results[i].Lgort, 
                            Lgobe: oData.results[i].Lgobe,
                        } 

                    }

                    var oDataNew = new sap.ui.model.json.JSONModel({
                        "results": aDeposito
                    });

                    //Seta o model a tela com o nome de síntese, dessa maneira os dados não serão buscados ao entrar na tela.
                    this.getView().setModel(oDataNew, "Deposito");

                }.bind(this),
                //Se deu erro.
                error: function(oError) { }.bind(this)
            });

            oDataModel.read("/VhVeiculoSet", {
                //Se deu certo
                success: function(oData, response) {
                    //Define um model do tipo Json.

                    var aVeiculo = [];

                    for (var i = 0; i < oData.results.length; i++) {

                        aVeiculo[i] = {
                            Vehicle: oData.results[i].Vehicle, 
                            VehText: oData.results[i].VehText,
                        } 

                    }

                    var oDataNew = new sap.ui.model.json.JSONModel({
                        "results": aVeiculo
                    });

                    //Seta o model a tela com o nome de síntese, dessa maneira os dados não serão buscados ao entrar na tela.
                    this.getView().setModel(oDataNew, "Veiculo");

                }.bind(this),
                //Se deu erro.
                error: function(oError) { }.bind(this)
            });

            oDataModel.read("/VhMotoristaSet", {
                //Se deu certo
                success: function(oData, response) {
                    //Define um model do tipo Json.

                    var aMotorista = [];

                    for (var i = 0; i < oData.results.length; i++) {

                        aMotorista[i] = {
                            Drivercode: oData.results[i].Drivercode, 
                            FirstName: oData.results[i].FirstName,
                            LastName: oData.results[i].LastName,
                        } 

                    }

                    var oDataNew = new sap.ui.model.json.JSONModel({
                        "results": aMotorista
                    });

                    //Seta o model a tela com o nome de síntese, dessa maneira os dados não serão buscados ao entrar na tela.
                    this.getView().setModel(oDataNew, "Motorista");

                }.bind(this),
                //Se deu erro.
                error: function(oError) { }.bind(this)
            });

            oDataModel.read("/VhIncoSet", {
                //Se deu certo
                success: function(oData, response) {
                    //Define um model do tipo Json.

                    var aInco = [];

                    for (var i = 0; i < oData.results.length; i++) {

                        aInco[i] = {
                            Inco1: oData.results[i].Inco1, 
                            Bezei: oData.results[i].Bezei,
                        } 

                    }

                    var oDataNew = new sap.ui.model.json.JSONModel({
                        "results": aInco
                    });

                    //Seta o model a tela com o nome de síntese, dessa maneira os dados não serão buscados ao entrar na tela.
                    this.getView().setModel(oDataNew, "Inco");

                }.bind(this),
                //Se deu erro.
                error: function(oError) { }.bind(this)
            });

            oDataModel.read("/VhGrpCompasSet", {
                //Se deu certo
                success: function(oData, response) {
                    //Define um model do tipo Json.

                    var aGrpCompras = [];

                    for (var i = 0; i < oData.results.length; i++) {

                        aGrpCompras[i] = {
                            Ekgrp: oData.results[i].Ekgrp, 
                            Eknam: oData.results[i].Eknam,
                        } 

                    }

                    var oDataNew = new sap.ui.model.json.JSONModel({
                        "results": aGrpCompras
                    });

                    //Seta o model a tela com o nome de síntese, dessa maneira os dados não serão buscados ao entrar na tela.
                    this.getView().setModel(oDataNew, "GrpCompras");

                }.bind(this),
                //Se deu erro.
                error: function(oError) { }.bind(this)
            });

            /* =================================================================== 
            Cria botao para a carga do arquivo
            =================================================================== */
            oTriggerButton = new sap.m.Button({
                text: 'Executar',
                type: 'Accept',
                press: function() {

                    this._buttonExecutar();

                }.bind(this)
            });

            /* =================================================================== 
            Cria botão de cancelar
            =================================================================== */
            var oCancelButton = new sap.m.Button({
                text: 'Cancelar',
                type: 'Reject',

                press: function() {
                    pressDialog.close();
                    pressDialog.destroy();
                    this.getView().removeAllDependents();
                }.bind(this)
            });

            /* =================================================================== 
            Configura conteúdo do Pop-up
            =================================================================== */
            var oContent = new sap.ui.layout.VerticalLayout({
                width: '100%',
                content: [
                    TRemArmaz,
                    IRemArmaz,
                    TJustificativa,
                    IJustificativa,
                    TCentroOrig,
                    ICentroOrig,
                    TCentroDest,
                    ICentroDest,
                    TNotaFiscal,
                    INotaFiscal,
                    TSerie,
                    ISerie,
                    TDataNotaFiscal,
                    IDataNotaFiscal,
                    TParcDest,
                    IParcDest,
                    TMaterial,
                    IMaterial,
                    TQtd,
                    IQtd,
                    TGrpCompras,
                    IGrpCompras,
                    TDepEntrada,
                    IDepEntrada,
                    TDepSaida,
                    IDepSaida,
                    TPrecoNotaFiscal,
                    IPrecoNotaFiscal,
                    TDataRemessa,
                    IDataRemessa,
                    TTransporte,
                    ITransporte,
                    TIncoterms,
                    IIncoterms,
                    TVeiculo,
                    IVeiculo,
                    TMotorista,
                    IMotorista,
                    //TCfop,
                    //ICfop,
                ]
            });
            /* =================================================================== 
            Cria janela pop-up
            =================================================================== */
            var pressDialog = new sap.m.Dialog({
                type: 'Message',
                title: "Iniciar Processo",
                resizable: true,
                draggable: true,
                titleAlignment: sap.m.TitleAlignment.Center,
                content: oContent,
                beginButton: oTriggerButton,
                endButton: oCancelButton,
                afterClose: function() {
                    pressDialog.destroy();
                },
                contentWidth: "30%",

            });

            /* =================================================================== 
            Chama janela pop-up
            =================================================================== */
            pressDialog.open();

        },
        initLocalModel: function(oEvent) {
            var oView = sap.ui.getCore().byId('br.com.ale.zz1conclanc::sap.suite.ui.generic.template.ListReport.view.ListReport::ZC_S2P_CONC_LANC_APP--page');

            var oViewModel = new sap.ui.model.json.JSONModel({
                Campos: {
                    IRemArmaz: "",
                    IJustificativa: "",
                    ICentroOrig: "",
                    ICentroDest: "",
                    INotaFiscal: "",
                    ISerie: "",
                    IDataNotaFiscal: "",
                    IParcDest: "",
                    IMaterial: "",
                    IQtd: "",
                    IGrpCompras: "",
                    IDepEntrada: "",
                    IDepSaida: "",
                    IPrecoNotaFiscal: "",
                    IDataRemessa: "",
                    ITransporte: "",
                    IIncoterms: "",
                    IVeiculo: "",
                    IMotorista: "",
                    ICfop: ""

                }
            });

            oView.setModel(oViewModel, "local");
        },
        _buttonExecutar : function (oEvent) {

            /* =================================================================== 
            Configura Serviço OData onde será extraído os dados
            =================================================================== */
            var vServiceUrl = "/sap/opu/odata/sap/ZGW_S2P_CONCILIADIR_LANC_NF_SRV/";
            var oDataModel = new sap.ui.model.odata.ODataModel(vServiceUrl, false);
            var oView = sap.ui.getCore().byId('br.com.ale.zz1conclanc::sap.suite.ui.generic.template.ListReport.view.ListReport::ZC_S2P_CONC_LANC_APP--page');
            var oViewModel = oView.getModel("local");
            
            var IRemArmaz = oViewModel.getProperty("/Campos/IRemArmaz");
            var IJustificativa = oViewModel.getProperty("/Campos/IJustificativa");
            var ICentroOrig = oViewModel.getProperty("/Campos/ICentroOrig");
            var ICentroDest = oViewModel.getProperty("/Campos/ICentroDest");
            var INotaFiscal = oViewModel.getProperty("/Campos/INotaFiscal");
            var ISerie = oViewModel.getProperty("/Campos/ISerie");
            var IDataNotaFiscal = oViewModel.getProperty("/Campos/IDataNotaFiscal");
            var IParcDest = oViewModel.getProperty("/Campos/IParcDest");
            var IMaterial = oViewModel.getProperty("/Campos/IMaterial");
            var IQtd = oViewModel.getProperty("/Campos/IQtd");
            var IGrpCompras = oViewModel.getProperty("/Campos/IGrpCompras");
            var IDepEntrada = oViewModel.getProperty("/Campos/IDepEntrada");
            var IDepSaida = oViewModel.getProperty("/Campos/IDepSaida");
            var IPrecoNotaFiscal = oViewModel.getProperty("/Campos/IPrecoNotaFiscal");
            var IDataRemessa = oViewModel.getProperty("/Campos/IDataRemessa");
            var ITransporte = oViewModel.getProperty("/Campos/ITransporte");
            var IIncoterms = oViewModel.getProperty("/Campos/IIncoterms");
            var IVeiculo = oViewModel.getProperty("/Campos/IVeiculo");
            var IMotorista = oViewModel.getProperty("/Campos/IMotorista");
            var ICfop = oViewModel.getProperty("/Campos/ICfop");
        
            var postData = {};
            postData.TipoProcesso = IRemArmaz.getValue();
            postData.Justificativa = IJustificativa.getValue();
            postData.CentroOrigem = ICentroOrig.getValue();
            postData.CentroDestino = ICentroDest.getValue();
            postData.NotaFiscal = INotaFiscal.getValue();
            postData.Serie = ISerie.getValue();
            postData.DataNf = IDataNotaFiscal.getValue();
            postData.Parceiro = IParcDest.getValue();
            postData.Material = IMaterial.getValue();
            postData.Quantidade = IQtd.getValue();
            postData.GrupoCompras = IGrpCompras.getValue();
            postData.DepositoEntrada = IDepEntrada.getValue();
            postData.DepositoSaida = IDepSaida.getValue();
            postData.PrecoNf = IPrecoNotaFiscal.getValue();
            postData.DtRemessa = IDataRemessa.getValue();

            switch (ITransporte.getValue()) {
                case 'Sim':
                    postData.Transporte = 'X';
                    break;
                
                default:
                    postData.Transporte = '';
                    break;
            }

            postData.Incoterms = IIncoterms.getValue();
            postData.Veiculo = IVeiculo.getValue();
            postData.Motorista = IMotorista.getValue();
            postData.Cfop = ICfop.getValue();
        
            // oDataModel.create("/StartProcessSet", postData, null, function () {
                
            //     var hdrMessage = response.headers["sap-message"];
            //     var hdrMessageObject = JSON.parse(hdrMessage);

            //     console.log(hdrMessageObject);
            //     console.log(hdrMessageObject.message);


            //     // MessageToast.show("Processo Iniciado com sucesso");
        
            // }, function (Error) {
            
            //     MessageToast.show("Erro ao Iniciar processo, ver Log.");
        
            // });

            if (this.validacao() === true){

            oDataModel.create("/StartProcessSet", postData, {
                method: "POST",
                success: function(data, response) {
                    var hdrMessage = response.headers["sap-message"];
                    var hdrMessageObject = JSON.parse(hdrMessage);
    
                    console.log(hdrMessageObject);
                    console.log(hdrMessageObject.message);
                },
                error: function(e) {
                    MessageToast.show("Erro ao Iniciar processo, ver Log.");
                }
               });

            }
             
        },
        DetermincacaoFiscal: function(oEvent) {
            //var oSelection = this.extensionAPI.getSelectedContexts();

            //var lo_model = oSelection[0].getObject();
            //var lv_externalref = lo_model.Empresa + lo_model.Filial + lo_model.Lifnr + lo_model.NrNf;

            sap.ushell.Container.getServiceAsync('CrossApplicationNavigation')
                .then(function(res){
                    var hash = res.hrefForExternal({
                            target: {semanticObject : 'zz1_deterfis', action: 'maintain'},
                        //    params: {
                        //        LogObjectId: 'ZMM_MONITSERV_CADFIS',
                        //        LogExternalId:lv_externalref,
                        //        DateFrom:lo_model.DtLancto.toLocaleDateString().split('/').reverse().join('-')
                        //    }
                        });

                        var url = window.location.href.split('#')[0] + hash;
                        sap.m.URLHelper.redirect(url, true);
            });
        },
        LogProcesso: function(oEvent) {
        //MessageToast.show("Custom handler invoked.");
        },
        CtrlNotaFiscal: function(oEvent) {
           var oSelection = this.extensionAPI.getSelectedContexts();

            var lo_model = oSelection[0].getObject();
            //var lv_externalref = lo_model.Empresa + lo_model.Filial + lo_model.Lifnr + lo_model.NrNf;

            sap.ushell.Container.getServiceAsync('CrossApplicationNavigation')
                .then(function(res){
                    var hash = res.hrefForExternal({
                            target: {semanticObject : 'zz1_ctrlnf', action: 'maintain'},
                        //    params: {
                        //        LogObjectId: 'ZMM_MONITSERV_CADFIS',
                        //        LogExternalId:lv_externalref,
                        //        DateFrom:lo_model.DtLancto.toLocaleDateString().split('/').reverse().join('-')
                        //    }
                        });

                        var url = window.location.href.split('#')[0] + hash;
                        sap.m.URLHelper.redirect(url, true);
            });
        },
        showmessagebox: function (message) {
            return new Promise(function(resolve){
                sap.m.MessageBox.show(message,sap.m.MessageBox.Icon.ERROR);
                setTimeout(resolve, 2000)
            })
        },
        busyindicator: function (oThis, enable) {
            return new Promise(function(resolve){
                var dialogBusy = oThis.getParent().getParent();
                dialogBusy.setBusy(enable);
                setTimeout(resolve, 2000)
            })
        },
        showmessagetoast: function (message) {
            return new Promise(function(resolve){
                sap.m.MessageToast.show(message);
                setTimeout(resolve, 2000)
            })
        },showemessagetable: function (aMessages, Type) {

            oMessageTemplate = new sap.m.MessageItem({
                type: '{type}',
                title: '{title}',
                description: '{description}',
                subtitle: '{subtitle}',
                counter: '{counter}',
                markupDescription: '{markupDescription}'
            });

            var oModel = new sap.ui.model.json.JSONModel();

            oModel.setData(aMessages);

            controller.oMessageView = new sap.m.MessageView({
                showDetailsPageHeader: true,
                itemSelect: function () {
                    oBackButton.setVisible(true);
                },
                items: {
                    path: "/",
                    template: oMessageTemplate
                }
            });			
            
            var oBackButton = new sap.m.Button({
                icon: sap.ui.core.IconPool.getIconURI("nav-back"),
                visible: false,
                press: function () {
                    controller.oMessageView.navigateBack();
                    controller.setVisible(false);
                }
            });

            controller.oMessageView.setModel(oModel);

            controller.oDialog = new sap.m.Dialog({
                resizable: true,
                content: controller.oMessageView,
                //state: Type,
                beginButton: new sap.m.Button({
                    press: function () {
                        controller.oDialog.close();
                    },
                    text: "Fechar"
                }),
                customHeader: new sap.m.Bar({
                    contentLeft: [oBackButton],
                    contentMiddle: [
                        new sap.m.Title({text: "Mensagens"})
                    ]
                }),
                contentHeight: "50%",
                contentWidth: "50%",
                verticalScrolling: false
            });
            
            controller.oMessageView.navigateBack();
            controller.oDialog.open();
    
        },
        validacao : function(oEvent) {
            var VError;
            var vReturn;


            /* =================================================================== 
            Configura Serviço OData onde será extraído os dados
            =================================================================== */
            var oView = sap.ui.getCore().byId('br.com.ale.zz1conclanc::sap.suite.ui.generic.template.ListReport.view.ListReport::ZC_S2P_CONC_LANC_APP--page');
            var oViewModel = oView.getModel("local");
            
            var IRemArmaz = oViewModel.getProperty("/Campos/IRemArmaz");
            var IJustificativa = oViewModel.getProperty("/Campos/IJustificativa");
            var ICentroOrig = oViewModel.getProperty("/Campos/ICentroOrig");
            var ICentroDest = oViewModel.getProperty("/Campos/ICentroDest");
            var INotaFiscal = oViewModel.getProperty("/Campos/INotaFiscal");
            var ISerie = oViewModel.getProperty("/Campos/ISerie");
            var IDataNotaFiscal = oViewModel.getProperty("/Campos/IDataNotaFiscal");
            var IParcDest = oViewModel.getProperty("/Campos/IParcDest");
            var IMaterial = oViewModel.getProperty("/Campos/IMaterial");
            var IQtd = oViewModel.getProperty("/Campos/IQtd");
            var IGrpCompras = oViewModel.getProperty("/Campos/IGrpCompras");
            var IDepEntrada = oViewModel.getProperty("/Campos/IDepEntrada");
            var IDepSaida = oViewModel.getProperty("/Campos/IDepSaida");
            var IPrecoNotaFiscal = oViewModel.getProperty("/Campos/IPrecoNotaFiscal");
            var IDataRemessa = oViewModel.getProperty("/Campos/IDataRemessa");
            var ITransporte = oViewModel.getProperty("/Campos/ITransporte");
            var IIncoterms = oViewModel.getProperty("/Campos/IIncoterms");
            var IVeiculo = oViewModel.getProperty("/Campos/IVeiculo");
            var IMotorista = oViewModel.getProperty("/Campos/IMotorista");
            var ICfop = oViewModel.getProperty("/Campos/ICfop");


            if(IRemArmaz.getValue() === ""){
                IRemArmaz.setValueState( sap.ui.core.ValueState.Error );
                IRemArmaz.setValueStateText( "Campo é Obrigatório" );
                VError =  true;
            }else{
                IRemArmaz.setValueState( sap.ui.core.ValueState.none );
            }  

            if(IJustificativa.getValue() === ""){
                IJustificativa.setValueState( sap.ui.core.ValueState.Error );
                IJustificativa.setValueStateText( "Campo é Obrigatório" );
                VError =  true;
            }else{
                IJustificativa.setValueState( sap.ui.core.ValueState.none );
            }  

            if(ICentroOrig.getValue() === ""){
                ICentroOrig.setValueState( sap.ui.core.ValueState.Error );
                ICentroOrig.setValueStateText( "Campo é Obrigatório" );
                VError =  true;
            }else{
                ICentroOrig.setValueState( sap.ui.core.ValueState.none );
            }  

            if(ICentroDest.getValue() === ""){
                ICentroDest.setValueState( sap.ui.core.ValueState.Error );
                ICentroDest.setValueStateText( "Campo é Obrigatório" );
                VError =  true;
            }else{
                ICentroDest.setValueState( sap.ui.core.ValueState.none );
            }  

            if(INotaFiscal.getValue() === ""){
                INotaFiscal.setValueState( sap.ui.core.ValueState.Error );
                INotaFiscal.setValueStateText( "Campo é Obrigatório" );
                VError =  true;
            }else{
                INotaFiscal.setValueState( sap.ui.core.ValueState.none );
            }  

            if(ISerie.getValue() === ""){
                ISerie.setValueState( sap.ui.core.ValueState.Error );
                ISerie.setValueStateText( "Campo é Obrigatório" );
                VError =  true;
            }else{
                ISerie.setValueState( sap.ui.core.ValueState.none );
            }  

            if(IDataNotaFiscal.getValue() === ""){
                IDataNotaFiscal.setValueState( sap.ui.core.ValueState.Error );
                IDataNotaFiscal.setValueStateText( "Campo é Obrigatório" );
                VError =  true;
            }else{
                IDataNotaFiscal.setValueState( sap.ui.core.ValueState.none );
            }  

            if(IParcDest.getValue() === ""){
                IParcDest.setValueState( sap.ui.core.ValueState.Error );
                IParcDest.setValueStateText( "Campo é Obrigatório" );
                VError =  true;
            }else{
                IParcDest.setValueState( sap.ui.core.ValueState.none );
            }  

            if(IMaterial.getValue() === ""){
                IMaterial.setValueState( sap.ui.core.ValueState.Error );
                IMaterial.setValueStateText( "Campo é Obrigatório" );
                VError =  true;
            }else{
                IMaterial.setValueState( sap.ui.core.ValueState.none );
            }  

            if(IQtd.getValue() === ""){
                IQtd.setValueState( sap.ui.core.ValueState.Error );
                IQtd.setValueStateText( "Campo é Obrigatório" );
                VError =  true;
            }else{
                IQtd.setValueState( sap.ui.core.ValueState.none );
            }  

            if(IGrpCompras.getValue() === ""){
                IGrpCompras.setValueState( sap.ui.core.ValueState.Error );
                IGrpCompras.setValueStateText( "Campo é Obrigatório" );
                VError =  true;
            }else{
                IGrpCompras.setValueState( sap.ui.core.ValueState.none );
            }  

            if(IDepEntrada.getValue() === ""){
                IDepEntrada.setValueState( sap.ui.core.ValueState.Error );
                IDepEntrada.setValueStateText( "Campo é Obrigatório" );
                VError =  true;
            }else{
                IDepEntrada.setValueState( sap.ui.core.ValueState.none );
            }  

            if(IDepSaida.getValue() === ""){
                IDepSaida.setValueState( sap.ui.core.ValueState.Error );
                IDepSaida.setValueStateText( "Campo é Obrigatório" );
                VError =  true;
            }else{
                IDepSaida.setValueState( sap.ui.core.ValueState.none );
            }  

            if(IPrecoNotaFiscal.getValue() === ""){
                IPrecoNotaFiscal.setValueState( sap.ui.core.ValueState.Error );
                IPrecoNotaFiscal.setValueStateText( "Campo é Obrigatório" );
                VError =  true;
            }else{
                IPrecoNotaFiscal.setValueState( sap.ui.core.ValueState.none );
            }  

            if(IIncoterms.getValue() === ""){
                IIncoterms.setValueState( sap.ui.core.ValueState.Error );
                IIncoterms.setValueStateText( "Campo é Obrigatório" );
                VError =  true;
            }else{
                IIncoterms.setValueState( sap.ui.core.ValueState.none );
            }  

            if(ITransporte.getValue() === ""){
                ITransporte.setValueState( sap.ui.core.ValueState.Error );
                ITransporte.setValueStateText( "Campo é Obrigatório" );
                VError =  true;
            }else{
                ITransporte.setValueState( sap.ui.core.ValueState.none );
            }  

            if(IDataRemessa.getValue() === ""){
                IDataRemessa.setValueState( sap.ui.core.ValueState.Error );
                IDataRemessa.setValueStateText( "Campo é Obrigatório" );
                VError =  true;
            }else{
                IDataRemessa.setValueState( sap.ui.core.ValueState.none );
            } 

            if(IVeiculo.getValue() === ""){
                IVeiculo.setValueState( sap.ui.core.ValueState.Error );
                IVeiculo.setValueStateText( "Campo é Obrigatório" );
                VError =  true;
            }else{
                IVeiculo.setValueState( sap.ui.core.ValueState.none );
            } 

            if(IMotorista.getValue() === ""){
                IMotorista.setValueState( sap.ui.core.ValueState.Error );
                IMotorista.setValueStateText( "Campo é Obrigatório" );
                VError =  true;
            }else{
                IMotorista.setValueState( sap.ui.core.ValueState.none );
            } 

            // if(ICfop.getValue() === ""){
            //     ICfop.setValueState( sap.ui.core.ValueState.Error );
            //     ICfop.setValueStateText( "Campo é Obrigatório" );
            //     VError =  true;
            // }else{
            //     ICfop.setValueState( sap.ui.core.ValueState.none );
            // } 

            
            if(VError !== true){
                vReturn = true;
            }
            else{
                vReturn = false;
            }

            return vReturn;

        },
        ExecucaoMassa: function(oEvent) {

            var postData = {};
            postData.Pedido = '9999999999';
        
            oDataModel.create("/ExecucaoMassaSet", postData, {
                method: "POST",
                success: function(data, response) {
                    var hdrMessage = response.headers["sap-message"];
                    var hdrMessageObject = JSON.parse(hdrMessage);
    
                    console.log(hdrMessageObject);
                    console.log(hdrMessageObject.message);
                },
                error: function(e) {
                    MessageToast.show("Erro ao Executar o processo em Massa, ver Log.");
                }
               });

        },
        onValueHelpCentroOrigem: function (oEvent) {
            var sInputValue = oEvent.getSource().getValue(),
                oView = controller.getView();

            if (!controller._pValueHelpCentroOrigem) {
                controller._pValueHelpCentroOrigem = sap.ui.core.Fragment.load({
                    id: oView.getId(),
                    name: "br.com.ale.zz1conclanc.ext.fragment.ValueHelpCentroOrigem",
                    controller: controller
                }).then(function (oDialog) {
                    oView.addDependent(oDialog);
                    return oDialog;
                });
            }
            controller._pValueHelpCentroOrigem.then(function (oDialog) {
                // Create a filter for the binding
                // oDialog.getBinding("items").filter([new Filter("Kunnr", FilterOperator.Contains, sInputValue)]);
                // Open ValueHelpCentro filtered by the input's value
                oDialog.open(sInputValue);
            });
        }, 
        onValueHelpCentroOrigemSearch: function (oEvent) {
            var sValue = oEvent.getParameter("value"); 
            var oFilter = new Filter("Werks", FilterOperator.Contains, sValue);

            oEvent.getSource().getBinding("items").filter([oFilter]);
        },

        onValueHelpCentroOrigemClose: function (oEvent) {

            /* =================================================================== 
            Configura Serviço OData onde será extraído os dados
            =================================================================== */
            var oView = sap.ui.getCore().byId('br.com.ale.zz1conclanc::sap.suite.ui.generic.template.ListReport.view.ListReport::ZC_S2P_CONC_LANC_APP--page');
            var oViewModel = oView.getModel("local");

            var ICentroOrig = oViewModel.getProperty("/Campos/ICentroOrig");

            var sKey,
                sValue,
                oSelectedItem = oEvent.getParameter("selectedItem");

            if (!oSelectedItem) {
                return;
            }

            sKey = oSelectedItem.getTitle();


            ICentroOrig.setValue(sKey);

            oEvent.getSource().getBinding("items").filter([]);

        },
        onValueHelpCentroDestino: function (oEvent) {
            var sInputValue = oEvent.getSource().getValue(),
                oView = controller.getView();

            if (!controller._pValueHelpCentroDestino) {
                controller._pValueHelpCentroDestino = sap.ui.core.Fragment.load({
                    id: oView.getId(),
                    name: "br.com.ale.zz1conclanc.ext.fragment.ValueHelpCentroDestino",
                    controller: controller
                }).then(function (oDialog) {
                    oView.addDependent(oDialog);
                    return oDialog;
                });
            }
            controller._pValueHelpCentroDestino.then(function (oDialog) {
                // Create a filter for the binding
                // oDialog.getBinding("items").filter([new Filter("Kunnr", FilterOperator.Contains, sInputValue)]);
                // Open ValueHelpCentro filtered by the input's value
                oDialog.open(sInputValue);
            });
        }, 
        onValueHelpCentroDestinoSearch: function (oEvent) {
            var sValue = oEvent.getParameter("value"); 
            var oFilter = new Filter("Werks", FilterOperator.Contains, sValue);

            oEvent.getSource().getBinding("items").filter([oFilter]);
        },

        onValueHelpCentroDestinoClose: function (oEvent) {

            /* =================================================================== 
            Configura Serviço OData onde será extraído os dados
            =================================================================== */
            var oView = sap.ui.getCore().byId('br.com.ale.zz1conclanc::sap.suite.ui.generic.template.ListReport.view.ListReport::ZC_S2P_CONC_LANC_APP--page');
            var oViewModel = oView.getModel("local");

            var ICentroDest = oViewModel.getProperty("/Campos/ICentroDest");

            var sKey,
                sValue,
                oSelectedItem = oEvent.getParameter("selectedItem");
            
            //oEvent.getSource().getBinding("items");

            if (!oSelectedItem) {
                return;
            }

            sKey = oSelectedItem.getTitle();


            ICentroDest.setValue(sKey);

            oEvent.getSource().getBinding("items").filter([]);

        },        
        onValueHelpMaterial: function (oEvent) {
            var sInputValue = oEvent.getSource().getValue(),
                oView = controller.getView();

            if (!controller._pValueHelpMaterial) {
                controller._pValueHelpMaterial = sap.ui.core.Fragment.load({
                    id: oView.getId(),
                    name: "br.com.ale.zz1conclanc.ext.fragment.ValueHelpMaterial",
                    controller: controller
                }).then(function (oDialog) {
                    oView.addDependent(oDialog);
                    return oDialog;
                });
            }
            controller._pValueHelpMaterial.then(function (oDialog) {
                // Create a filter for the binding
                // oDialog.getBinding("items").filter([new Filter("Kunnr", FilterOperator.Contains, sInputValue)]);
                // Open ValueHelpCentro filtered by the input's value
                oDialog.open(sInputValue);
            });
        }, 
        onValueHelpMaterialSearch: function (oEvent) {
            var sValue = oEvent.getParameter("value"); 
            var oFilter = new Filter("Matnr", FilterOperator.Contains, sValue);

            oEvent.getSource().getBinding("items").filter([oFilter]);
        },

        onValueHelpMaterialClose: function (oEvent) {

            /* =================================================================== 
            Configura Serviço OData onde será extraído os dados
            =================================================================== */
            var oView = sap.ui.getCore().byId('br.com.ale.zz1conclanc::sap.suite.ui.generic.template.ListReport.view.ListReport::ZC_S2P_CONC_LANC_APP--page');
            var oViewModel = oView.getModel("local");

            var IMaterial = oViewModel.getProperty("/Campos/IMaterial");

            var sKey,
                sValue,
                oSelectedItem = oEvent.getParameter("selectedItem");
            
            //oEvent.getSource().getBinding("items");

            if (!oSelectedItem) {
                return;
            }

            sKey = oSelectedItem.getTitle();


            IMaterial.setValue(sKey);

            oEvent.getSource().getBinding("items").filter([]);

        },
        onValueHelpDepositoEntrada: function (oEvent) {
            var sInputValue = oEvent.getSource().getValue(),
                oView = controller.getView();

            if (!controller._pValueHelpDepositoEntrada) {
                controller._pValueHelpDepositoEntrada = sap.ui.core.Fragment.load({
                    id: oView.getId(),
                    name: "br.com.ale.zz1conclanc.ext.fragment.ValueHelpDepositoEntrada",
                    controller: controller
                }).then(function (oDialog) {
                    oView.addDependent(oDialog);
                    return oDialog;
                });
            }
            controller._pValueHelpDepositoEntrada.then(function (oDialog) {
                // Create a filter for the binding
                // oDialog.getBinding("items").filter([new Filter("Kunnr", FilterOperator.Contains, sInputValue)]);
                // Open ValueHelpCentro filtered by the input's value
                oDialog.open(sInputValue);
            });
        }, 
        onValueHelpDepositoEntradaSearch: function (oEvent) {
            var sValue = oEvent.getParameter("value"); 
            var oFilter = new Filter("Lgort", FilterOperator.Contains, sValue);

            oEvent.getSource().getBinding("items").filter([oFilter]);
        },

        onValueHelpDepositoEntradaClose: function (oEvent) {

            /* =================================================================== 
            Configura Serviço OData onde será extraído os dados
            =================================================================== */
            var oView = sap.ui.getCore().byId('br.com.ale.zz1conclanc::sap.suite.ui.generic.template.ListReport.view.ListReport::ZC_S2P_CONC_LANC_APP--page');
            var oViewModel = oView.getModel("local");

            var IDepEntrada = oViewModel.getProperty("/Campos/IDepEntrada");

            var sKey,
                sValue,
                oSelectedItem = oEvent.getParameter("selectedItem");
            
            //oEvent.getSource().getBinding("items");

            if (!oSelectedItem) {
                return;
            }

            sKey = oSelectedItem.getTitle();


            IDepEntrada.setValue(sKey);

            oEvent.getSource().getBinding("items").filter([]);

        },
        onValueHelpDepositoSaida: function (oEvent) {
            var sInputValue = oEvent.getSource().getValue(),
                oView = controller.getView();

            if (!controller._pValueHelpDepositoSaida) {
                controller._pValueHelpDepositoSaida = sap.ui.core.Fragment.load({
                    id: oView.getId(),
                    name: "br.com.ale.zz1conclanc.ext.fragment.ValueHelpDepositoSaida",
                    controller: controller
                }).then(function (oDialog) {
                    oView.addDependent(oDialog);
                    return oDialog;
                });
            }
            controller._pValueHelpDepositoSaida.then(function (oDialog) {
                // Create a filter for the binding
                // oDialog.getBinding("items").filter([new Filter("Kunnr", FilterOperator.Contains, sInputValue)]);
                // Open ValueHelpCentro filtered by the input's value
                oDialog.open(sInputValue);
            });
        }, 
        onValueHelpDepositoSaidaSearch: function (oEvent) {
            var sValue = oEvent.getParameter("value"); 
            var oFilter = new Filter("Lgort", FilterOperator.Contains, sValue);

            oEvent.getSource().getBinding("items").filter([oFilter]);
        },

        onValueHelpDepositoSaidaClose: function (oEvent) {

            /* =================================================================== 
            Configura Serviço OData onde será extraído os dados
            =================================================================== */
            var oView = sap.ui.getCore().byId('br.com.ale.zz1conclanc::sap.suite.ui.generic.template.ListReport.view.ListReport::ZC_S2P_CONC_LANC_APP--page');
            var oViewModel = oView.getModel("local");

            var IDepSaida = oViewModel.getProperty("/Campos/IDepSaida");

            var sKey,
                sValue,
                oSelectedItem = oEvent.getParameter("selectedItem");
            
            //oEvent.getSource().getBinding("items");

            if (!oSelectedItem) {
                return;
            }

            sKey = oSelectedItem.getTitle();


            IDepSaida.setValue(sKey);

            oEvent.getSource().getBinding("items").filter([]);

        },
        onValueHelpMotorista: function (oEvent) {
            var sInputValue = oEvent.getSource().getValue(),
                oView = controller.getView();

            if (!controller._pValueHelpMotorista) {
                controller._pValueHelpMotorista = sap.ui.core.Fragment.load({
                    id: oView.getId(),
                    name: "br.com.ale.zz1conclanc.ext.fragment.ValueHelpMotorista",
                    controller: controller
                }).then(function (oDialog) {
                    oView.addDependent(oDialog);
                    return oDialog;
                });
            }
            controller._pValueHelpMotorista.then(function (oDialog) {
                // Create a filter for the binding
                // oDialog.getBinding("items").filter([new Filter("Kunnr", FilterOperator.Contains, sInputValue)]);
                // Open ValueHelpCentro filtered by the input's value
                oDialog.open(sInputValue);
            });
        }, 
        onValueHelpMotoristaSearch: function (oEvent) {
            var sValue = oEvent.getParameter("value"); 
            var oFilter = new Filter("Drivercode", FilterOperator.Contains, sValue);

            oEvent.getSource().getBinding("items").filter([oFilter]);
        },

        onValueHelpMotoristaClose: function (oEvent) {

            /* =================================================================== 
            Configura Serviço OData onde será extraído os dados
            =================================================================== */
            var oView = sap.ui.getCore().byId('br.com.ale.zz1conclanc::sap.suite.ui.generic.template.ListReport.view.ListReport::ZC_S2P_CONC_LANC_APP--page');
            var oViewModel = oView.getModel("local");

            var IMotorista = oViewModel.getProperty("/Campos/IMotorista");

            var sKey,
                sValue,
                oSelectedItem = oEvent.getParameter("selectedItem");
            
            //oEvent.getSource().getBinding("items");

            if (!oSelectedItem) {
                return;
            }

            sKey = oSelectedItem.getTitle();


            IMotorista.setValue(sKey);

            oEvent.getSource().getBinding("items").filter([]);

        },
        onValueHelpVeiculo: function (oEvent) {
            var sInputValue = oEvent.getSource().getValue(),
                oView = controller.getView();

            if (!controller._pValueHelpVeiculo) {
                controller._pValueHelpVeiculo = sap.ui.core.Fragment.load({
                    id: oView.getId(),
                    name: "br.com.ale.zz1conclanc.ext.fragment.ValueHelpVeiculo",
                    controller: controller
                }).then(function (oDialog) {
                    oView.addDependent(oDialog);
                    return oDialog;
                });
            }
            controller._pValueHelpVeiculo.then(function (oDialog) {
                // Create a filter for the binding
                // oDialog.getBinding("items").filter([new Filter("Kunnr", FilterOperator.Contains, sInputValue)]);
                // Open ValueHelpCentro filtered by the input's value
                oDialog.open(sInputValue);
            });
        }, 
        onValueHelpVeiculoSearch: function (oEvent) {
            var sValue = oEvent.getParameter("value"); 
            var oFilter = new Filter("Vehicle", FilterOperator.Contains, sValue);

            oEvent.getSource().getBinding("items").filter([oFilter]);
        },

        onValueHelpVeiculoClose: function (oEvent) {

            /* =================================================================== 
            Configura Serviço OData onde será extraído os dados
            =================================================================== */
            var oView = sap.ui.getCore().byId('br.com.ale.zz1conclanc::sap.suite.ui.generic.template.ListReport.view.ListReport::ZC_S2P_CONC_LANC_APP--page');
            var oViewModel = oView.getModel("local");

            var IVeiculo = oViewModel.getProperty("/Campos/IVeiculo");

            var sKey,
                sValue,
                oSelectedItem = oEvent.getParameter("selectedItem");
            
            //oEvent.getSource().getBinding("items");

            if (!oSelectedItem) {
                return;
            }

            sKey = oSelectedItem.getTitle();


            IVeiculo.setValue(sKey);

            oEvent.getSource().getBinding("items").filter([]);

        },
        onValueHelpInco: function (oEvent) {
            var sInputValue = oEvent.getSource().getValue(),
                oView = controller.getView();

            if (!controller._pValueHelpInco) {
                controller._pValueHelpInco = sap.ui.core.Fragment.load({
                    id: oView.getId(),
                    name: "br.com.ale.zz1conclanc.ext.fragment.ValueHelpInco",
                    controller: controller
                }).then(function (oDialog) {
                    oView.addDependent(oDialog);
                    return oDialog;
                });
            }
            controller._pValueHelpInco.then(function (oDialog) {
                // Create a filter for the binding
                // oDialog.getBinding("items").filter([new Filter("Kunnr", FilterOperator.Contains, sInputValue)]);
                // Open ValueHelpCentro filtered by the input's value
                oDialog.open(sInputValue);
            });
        }, 
        onValueHelpIncoSearch: function (oEvent) {
            var sValue = oEvent.getParameter("value"); 
            var oFilter = new Filter("Inco1", FilterOperator.Contains, sValue);

            oEvent.getSource().getBinding("items").filter([oFilter]);
        },

        onValueHelpIncoClose: function (oEvent) {

            /* =================================================================== 
            Configura Serviço OData onde será extraído os dados
            =================================================================== */
            var oView = sap.ui.getCore().byId('br.com.ale.zz1conclanc::sap.suite.ui.generic.template.ListReport.view.ListReport::ZC_S2P_CONC_LANC_APP--page');
            var oViewModel = oView.getModel("local");

            var IIncoterms = oViewModel.getProperty("/Campos/IIncoterms");

            var sKey,
                sValue,
                oSelectedItem = oEvent.getParameter("selectedItem");
            
            //oEvent.getSource().getBinding("items");

            if (!oSelectedItem) {
                return;
            }

            sKey = oSelectedItem.getTitle();


            IIncoterms.setValue(sKey);

            oEvent.getSource().getBinding("items").filter([]);

        },
        onValueHelpGrpCompras: function (oEvent) {
            var sInputValue = oEvent.getSource().getValue(),
                oView = controller.getView();

            if (!controller._pValueHelpGrpCompras) {
                controller._pValueHelpGrpCompras = sap.ui.core.Fragment.load({
                    id: oView.getId(),
                    name: "br.com.ale.zz1conclanc.ext.fragment.ValueHelpGrpCompras",
                    controller: controller
                }).then(function (oDialog) {
                    oView.addDependent(oDialog);
                    return oDialog;
                });
            }
            controller._pValueHelpGrpCompras.then(function (oDialog) {
                // Create a filter for the binding
                // oDialog.getBinding("items").filter([new Filter("Kunnr", FilterOperator.Contains, sInputValue)]);
                // Open ValueHelpCentro filtered by the input's value
                oDialog.open(sInputValue);
            });
        }, 
        onValueHelpGrpComprasSearch: function (oEvent) {
            var sValue = oEvent.getParameter("value"); 
            var oFilter = new Filter("Ekgrp", FilterOperator.Contains, sValue);

            oEvent.getSource().getBinding("items").filter([oFilter]);
        },

        onValueHelpGrpComprasClose: function (oEvent) {

            /* =================================================================== 
            Configura Serviço OData onde será extraído os dados
            =================================================================== */
            var oView = sap.ui.getCore().byId('br.com.ale.zz1conclanc::sap.suite.ui.generic.template.ListReport.view.ListReport::ZC_S2P_CONC_LANC_APP--page');
            var oViewModel = oView.getModel("local");

            var IGrpCompras = oViewModel.getProperty("/Campos/IGrpCompras");

            var sKey,
                sValue,
                oSelectedItem = oEvent.getParameter("selectedItem");
            
            //oEvent.getSource().getBinding("items");

            if (!oSelectedItem) {
                return;
            }

            sKey = oSelectedItem.getTitle();


            IGrpCompras.setValue(sKey);

            oEvent.getSource().getBinding("items").filter([]);

        },
    };
});


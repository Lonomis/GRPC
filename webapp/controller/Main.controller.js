sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/BusyIndicator",
	"zmmo071303/type/Quantity",
	"zmmo071303/model/InputModel",
	"zmmo071303/model/OrderModel",
	"zmmo071303/model/SlocModel",
	"zmmo071303/model/ScannedDataModel",
	"zmmo071303/screenManager/ScreenManager",
	"zmmo071303/messagePopover/MessagePopover",
	"zmmo071303/barcodeScanner/BarcodeScanner",
	"zmmo071303/messageStrip/MessageStrip",
	"zmmo071303/helper/MainControllerHelper",
	"zmmo071303/slocDialog/SlocDialog"
],
	/**
	 * @param {typeof sap.ui.core.mvc.Controller} Controller
	 */
	/**
	 * @param {typeof sap.ui.core.BusyIndicator} BusyIndicator
	 */
	/**
	 * @param {typeof zmmo071303.type.Quantity} Quantity
	 */
	/**
	 * @param {typeof zmmo071303.model.InputModel} InputModel
	 */
	/**
	 * @param {typeof zmmo071303.model.OrderModel} OrderModel
	 */
	/**
	 * @param {typeof zmmo071303.model.SlocModel} SlocModel
	 */
	/**
	 * @param {typeof zmmo071303.model.ScannedDataModel} ScannedDataModel
	 */
	/**
	 * @param {typeof zmmo071303.screenManager.ScreenManager} screenManager
	 */
	/**
	 * @param {typeof zmmo071303.messagePopover.MessagePopover} MessagePopover
	 */
	/**
	 * @param {typeof zmmo071303.barcodeScanner.BarcodeScanner} BarcodeScanner
	 */
	/**
	 * @param {typeof zmmo071303.messageStrip.MessageStrip} MessageStrip
	 */
	/**
	 * @param {typeof zmmo071303.helper.MainControllerHelper} MainControllerHelper
	 */
	/**
	 * @param {typeof zmmo071303.slocDialog.SlocDialog} SlocDialog
	 */
	function (Controller, BusyIndicator, Quantity, InputModel, 
			  OrderModel, SlocModel, ScannedDataModel,
			  ScreenManager, MessagePopover, BarcodeScanner, 
			  MessageStrip, MainControllerHelper, SlocDialog) {
		"use strict";

		return Controller.extend("zmmo071303.controller.Main", {
			quantityType:	Quantity,

			onInit: async function () {
				//Instatiate Input Model
				this.InputModel = new InputModel();
				this.InputModel.setModel(this.getView(), "input");
				
				//Instantiate Order Model
				this.OrderModel = new OrderModel(this.getView().getModel());

				//Instantiate Storage Location Model
				this.SlocModel = new SlocModel(this.getView().getModel(), this.getView(), "sloc");

				//Instantiate Scanned Data Model
				this.ScannedDataModel = new ScannedDataModel(this.getView(), "scannedData");

				//Instantiate ScreenManager
				this.ScreenManager = new ScreenManager(this.getView(), this.getView().byId("contentVBox"), "fragment", this);
				await this.ScreenManager.loadFragment("Init");

				//Instantiate Barcode Scanner
				this.BarcodeScanner = new BarcodeScanner();
				this.BarcodeScanner.setStatusModel(this.getView());
				
				//Instantiate Sloc Dialog
				this.SlocDialog		= new SlocDialog(this.InputModel, this.SlocModel);

				//Intantiate Message Popover
				this.MessagePopover = new MessagePopover(this.getView());
				this.MessagePopover.setMessageModel(this.getView());

				//Instantiate Message Strip
				this.MessageStrip	= new MessageStrip(this.getView().byId("messageStripArea"));
			},

			onPressReject: function(oEvent){
				var oData = this.InputModel.getData();
				
				MainControllerHelper.clearMessages(this.MessageStrip, this.MessagePopover, this.InputModel);

				oData.Reject = ( oData.Reject ) ? false : true;
				this.InputModel.setData(oData);
			},

			onGetData: async function(oEvent){
				MainControllerHelper.clearMessages(this.MessageStrip, this.MessagePopover, this.InputModel);
				MainControllerHelper.getOrderData(this.OrderModel, this.InputModel);
			},

			onMessagePopover: function(oEvent){
				var oButtonPopover = this.getView().byId("messagePopOverButton");

				this.MessagePopover.openMessagePopover(oButtonPopover, oEvent);
			},

			onSLocSearch: function(oEvent){
				MainControllerHelper.clearMessages(this.MessageStrip, this.MessagePopover, this.InputModel);
				MainControllerHelper.openSlocSearchDialog(this.SlocDialog,
														  this.getView());
			},

			onCancel: function(oEvent) {
				this.InputModel.clearData();
				MainControllerHelper.clearMessages(this.MessageStrip, this.MessagePopover, this.InputModel);
			},

			onNext: function(oEvent) {
                MainControllerHelper.clearMessages(this.MessageStrip, this.MessagePopover, this.InputModel);

                try {
                    MainControllerHelper.validateRequiredFields(this.MessagePopover);
                    MainControllerHelper.validateValue(this.MessagePopover);
                    MainControllerHelper.keepInputData(this.InputModel,
                                                       this.OrderModel,
												       this.ScannedDataModel);   
                } catch (oError) {
                    
                }
			},

			onScannedList:	function(oEvent){
				MainControllerHelper.clearMessages(this.MessageStrip, this.MessagePopover, this.InputModel);
				this.ScreenManager.loadFragment("ScannedList");
			},

			onScannedListBack: function(oEvent){
				this.ScreenManager.loadFragment("Init");
			},

			onSave: async function(oEvent){
				var oScannedData    =   this.ScannedDataModel.getData();

				MainControllerHelper.clearMessages(this.MessageStrip, this.MessagePopover, this.InputModel);

				try {
					BusyIndicator.show(0);
					var oResult = await this.OrderModel.postScannedData(oScannedData);
					this.MessageStrip.showMessageStrip(oResult.message, this.OrderModel.SuccessStatus);
				} catch (oError) {
					this.MessageStrip.showMessageStrip(oError.message, this.OrderModel.ErrorStatus);
					
				};

				BusyIndicator.hide();
				this.InputModel.clearData();
				this.ScannedDataModel.clearData();
			},

			onScan: async function(oEvent){
				MainControllerHelper.clearMessages(this.MessageStrip, this.MessagePopover, this.InputModel);
				this.InputModel.clearData();

				try{
					var oResult 	= 	await this.BarcodeScanner.scan();
					this.InputModel.setResultFromBarcode(oResult.details);
					MainControllerHelper.getOrderData(this.OrderModel, this.InputModel);
				} catch (oError) {
					
				}
            }
		});
	});

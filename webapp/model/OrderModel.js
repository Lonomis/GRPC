sap.ui.define([
    "sap/ui/base/Object",
    "sap/ui/model/resource/ResourceModel"
], function(Object, ResourceModel){
    "use strict";

    return Object.extend("zmmo071303.model.OrderModel", {
        _OrderModel         :   {},
        SuccessStatus       :   "Success",
        ErrorStatus         :   "Error",
        _ResourceBundle:    new ResourceModel({
            bundleName:         "zmmo071303.i18n.i18n",
            supportedLocales:   [""],
            fallbackLocales:    ""
        }).getResourceBundle(),

        constructor : function(oModel){
            this._OrderModel    =   oModel;
        },

        getOrderData: function(sOrderNo){
            var that = this;
            var oParameters = this.buildGetOrderParameter(sOrderNo);

            return new Promise(function(resolve, reject){
                that._OrderModel.callFunction("/GetPCOrder", {
                    method          :   "GET",
                    urlParameters   :   oParameters,
                    success         :   function(oData) {
                        resolve({
                            status  :   that.SuccessStatus,
                            details :   oData.GetPCOrder
                        })
                    },
                    error           :   function(oError) {
                        reject({
                            status  :   that.ErrorStatus,
                            details :   oError
                        })
                    } 
                })
            });
        },

        buildGetOrderParameter: function(sOrderNo){
            return {
                "OrderNo"               :   ( !sOrderNo ? "" : sOrderNo),
                "RackNo"                :   "00",
                "TransportationType"    :   "0"
            }
        },

        postScannedData:    function(oScannedData){
            var that = this;
            var oDataToBePosted =   this.prepareDataToBePosted(oScannedData);

            return new Promise(function(resolve, reject){
                that._OrderModel.create("/GoodsReceiptPCs", oDataToBePosted, {
                    success : function(oData) {
                        resolve({
                            status  :   that.SuccessStatus,
                            details :   oData,
                            message :   that.getPostSuccessMessage(oData.MaterialDocumentNo)
                        })
                    },
                    error : function(oError) {
                        reject({
                            status  :   that.ErrorStatus,
                            details :   oError,
                            message :   that.getPostErrorMessage()
                        })
                    }
                })
            })
        },

        prepareDataToBePosted:  function(oScannedData){
            return {
                TransactionId   :   "1",
                TransactionCode :   "ZMMO071_303",
                ToItems         :   this.appendToItems(oScannedData.ScannedData)
            }
        },

        appendToItems: function(aScannedDataList){
            var aToItems    =   [];

            aScannedDataList.forEach(function(oScannedData){
                aToItems.push({
                    TransactionId   :   "1",
                    ItemNo          :   oScannedData.ItemNo.toString(),
                    Reject          :   ( oScannedData.Reject ? "X" : "" ),
                    Material        :   oScannedData.Material,
                    Plant           :   oScannedData.Plant,
                    StorageLocation :   oScannedData.StorageLocation,
                    Vendor          :   oScannedData.Vendor,
                    Count           :   oScannedData.Count.toString(),
                    OrderNo         :   oScannedData.OrderNo,
                    Barcode         :   oScannedData.Barcode
                });
            });

            return aToItems;
        },

        getPostSuccessMessage: function(sMaterialDocumentNo) {
            return this._ResourceBundle.getText("post.Success", 
                                                [sMaterialDocumentNo]);
        },

        getPostErrorMessage: function(oInputData) {
            return this._ResourceBundle.getText("post.Error");
        }
    });
});
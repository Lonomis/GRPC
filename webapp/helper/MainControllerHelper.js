sap.ui.define([
    "sap/ui/core/BusyIndicator"
], function(BusyIndicator) {
    'use strict';
    
    return ({
        getOrderData :   async function(oOrderModel, oInputModel) {
            var oInputData = oInputModel.getData();

            try {
                BusyIndicator.show(0);
                var oResult = await oOrderModel.getOrderData(oInputData.ProductionOrder);
                BusyIndicator.hide();
            
                if (oResult.status === oOrderModel.SuccessStatus) {
                    oInputData.ProductionOrder      =   oResult.details.OrderNo;
                    oInputData.Material			    =	oResult.details.Material;
                    oInputData.MaterialName		    =	oResult.details.MaterialName;
                    oInputData.WBS				    =	oResult.details.WBS;
                    oInputData.Plant                =   oResult.details.Plant;
                    oInputData.StorageLocation	    =	oResult.details.StorageLocation;
                    oInputData.ProductionVersion    =   oResult.details.ProductionVersion;
                
                    oInputModel.setData(oInputData);
                }
            } catch {
                BusyIndicator.hide();
            }
       },
       
       openSlocSearchDialog : function(oSlocDialog, oView){
            oSlocDialog.openDialog(oView);
       },

       keepInputData : async function(oInputModel, oOrderModel, oScannedDataModel) {
        var oInputData = oInputModel.getData();

        try {
            BusyIndicator.show(0);
            await oOrderModel.getOrderData(oInputData.ProductionOrder);
            BusyIndicator.hide();
            
            oScannedDataModel.appendScannedData(oInputData);

            oInputModel.clearData();
        } catch {
            BusyIndicator.hide();
        }

       },

       clearMessages : function(oMessageStrip, oMessagePopover, oInputModel) {
            oInputModel.refresh(true);
            oMessageStrip.clearMessageStrip();
            oMessagePopover.removeAllMessages();

       }
    });
});
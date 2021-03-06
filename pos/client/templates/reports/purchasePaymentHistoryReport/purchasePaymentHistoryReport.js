Session.set('branchIds', null);
Template.pos_purchasePaymentHistoryReport.onRendered(function () {
    Meteor.typeahead.inject();
});
Template.pos_purchasePaymentHistoryReport.events({});
Template.pos_purchasePaymentHistoryReport.helpers({
    search: function (query, sync, callback) {
        Meteor.call('searchPurchase', query, {}, function (err, res) {
            if (err) {
                console.log(err);
                return;
            }
            callback(res);
        });
    },
    selected: function (event, suggestion, dataSetName) {
        // event - the jQuery event object
        // suggestion - the suggestion object
        // datasetName - the name of the dataset the suggestion belongs to
        // TODO your event handler here
        var id = suggestion._id;
        $('#search-purchase-id').val(id);
        $('[name="search"]').typeahead('val', suggestion._id);
        //$('[name="search"]').select();
    }
});

Template.pos_purchasePaymentHistoryReportGen.helpers({
    options: function () {
        return {
            //fontSize: 'bg',
            paper: 'a4',
            orientation: 'portrait'
        };
    },
    data: function () {
        // Get query params
        //FlowRouter.watchPathChange();
        var q = FlowRouter.current().queryParams;
        var callId = JSON.stringify(q);
        var call = Meteor.callAsync(callId, 'posPurchasePaymentHistoryReport', q);
        if (!call.ready()) {
            return false;
        }
        return call.result();
    }
});




(function() {
    'use strict';

    angular
        .module('YourApp')
        .factory('googleAnalyticsService', googleAnalyticsService);

    function googleAnalyticsService($window) {
        var plugin;
        var service = {};

        service.initialise = function() {
            try {
                plugin = $window.analytics;

                if (plugin) {
                    plugin.startTrackerWithId(YourgoogleAnalyticsTrackingId);

                    plugin.enableUncaughtExceptionReporting(true,
                        function() {
                            console.log('Successfully enabled uncaught exception reporting');
                        },
                        function() {
                            console.log('Failed to enable uncaught exception reporting');
                        });
                }
            } catch (error) {
                console.log(error);
            }
        };

        service.trackException = function(exception, isFatal) {
            try {
                if (plugin && exception) {
                    plugin.trackException(exception, !!isFatal);
                }
            } catch (error) {
                console.log(error);
            }
        };

        service.trackView = function(pageName) {
            try {
                if (plugin) {
                    plugin.trackView(pageName);
                }
            } catch (error) {
                console.log(error);
            }
        };

        service.trackEvent = function(category, action, label, value) {
            try {
                if (plugin) {
                    plugin.trackEvent(category, action, label, value);
                }
            } catch (error) {
                console.log(error);
            }
        };

        service.sendTransfer = function(cartitems, reseller, priceFormat, cartTotal) {
            try {
                if (plugin) {
                    var transactionId = generateUUID();
                    var affiliation = reseller.name;
                    var revenue = cartTotal;
                    var currencyCode = decodeURIComponent(priceFormat.iso4217);

                    plugin.addTransaction(transactionId, affiliation, revenue, 0, 0, currencyCode);

                    _.each(cartitems, function(item) {
                        if (item.price > 0) {
                            plugin.addTransactionItem(
                                transactionId,
                                item.name,
                                item.sku,
                                item.description,
                                item.price,
                                item.quantity,
                                currencyCode);
                        }
                    });
                }
            } catch (error) {
                console.log(error);
            }
        };

        return service;

        function loadPlugin() {
            if (!plugin && $window.analytics) {
                plugin = $window.analytics;
            }
        }

        function generateUUID() {
            var d = new Date().getTime();

            var uuid = 'xxxxx-xxxx-4xx-yxx'.replace(/[xy]/g, function(c) {
                var r = (d + Math.random() * 16) % 16 | 0;
                d = Math.floor(d / 16);
                return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
            });

            return uuid;
        }

    }
}());

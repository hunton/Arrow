define([
	'jquery',
	'underscore',
	'backbone',
	'vent',
	'views/header/ImportExportView',
	'views/header/ShareView'
], function ($, _, Backbone, vent, ImportExportView, ShareView) {

	var HeaderView = Backbone.View.extend({

		el: $('header'),

		events: {
			'click #importExport': 'importExport',
			'click #share': 'share'
		},

		importExport: function () {
			var iev = new ImportExportView();
			iev.render();
		},

		share: function () {
			var sv = new ShareView();
			sv.render();
		}

	});

	return HeaderView;
});
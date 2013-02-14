define([
	'jquery',
	'underscore',
	'backbone',
	'vent'
], function ($, _, Backbone, vent) {

	'use strict';

	/**
	 * The list of dashboards in the sidebar
	 */
	var DashboardListItemView = Backbone.View.extend({

		tagName: 'li',

		events: {
			'mousedown': 'click',
			'click .del': 'del'
		},

		template: _.template('<div class="del"></div><%= title %>'),

		/**
		 * Watch for change events
		 */
		initialize: function () {
			this.model.on('change', this.render, this);
		},

		/**
		 * Render the li
		 */
		render: function () {

			var body = this.template(this.model.toJSON());
			this.$el.html(body);

			// is this dashboard selected
			if (this.model.get('hidden')){
				this.$el.removeClass('selected');
			} else {
				this.$el.addClass('selected');
			}

			return this;
		},

		click: function (event) {

			if ($(event.target).hasClass('del')) {
				return;
			}

			this.model.collection.each(function (d) {
				d.hide();
			});
			this.model.show();
			this.model.save();
		},

		del: function (e) {

			var index = null;

			// find the current index
			this.model.collection.each(function (d, i) {
				if (d === this.model) {
					index = i;
				}
			}.bind(this));

			// do we have an element after
			if (this.model.collection.at(index + 1)) {
				this.model.collection.at(index + 1).show();
			} else if (this.model.collection.at(index - 1)) {
				this.model.collection.at(index - 1).show();
			} else {
				// do nothing
			}

			// remove this element
			this.remove();
			this.model.destroy();
		}
	});

	return DashboardListItemView;
});

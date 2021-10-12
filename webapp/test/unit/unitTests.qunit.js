/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"zmmo071_303/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});

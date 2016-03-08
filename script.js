(function (angular) {

	'use strict';

	angular.module("app", ["ui.router", "app.home", "app.work", "app.publication", "app.profile"]);

	function Run ($log) {
		$log.log("Run");
	}

	Run.$inject = ['$log'];

	angular.module("app").run(Run);

	function Config ($stateProvider, $urlRouterProvider, $locationProvider) {
		$locationProvider.html5Mode({
			enabled: true,
			requireBase: false
		});
	}

	Config.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];

	angular.module("app").config(Config);

	function PorfolioHeader () {
		var directive = {
			link: link,
			templateUrl: "portfolio-header.html",
			restrict: 'EA'
		};

		return directive;

		function link (scope, element, attrs) {
			/* */
		}
	}

	PorfolioHeader.$inject = [];

	angular.module("app").directive("portfolioHeader", PorfolioHeader);

	function PorfolioFooter () {
		var directive = {
			link: link,
			templateUrl: "portfolio-footer.html",
			restrict: 'EA'
		};

		return directive;

		function link (scope, element, attrs) {
			/* */
		}
	}

	PorfolioFooter.$inject = [];

	angular.module("app").directive("portfolioFooter", PorfolioFooter);

	/////////////////////////////////////
	
	/// Home Module ///
	
	angular.module('app.home', []);

	function HomeConfig ($stateProvider) {
		$stateProvider.state("home", {
			url: "/",
			templateUrl: "home.html",
			controller: "HomeController",
			controllerAs: "vm"
		});
	}

	HomeConfig.$inject = ['$stateProvider'];

	angular.module('app.home').config(HomeConfig);


	function HomeController ($log) {
		$log.log("Home")
	}

	HomeController.$inject = ['$log'];

	angular.module('app.home').controller("HomeController", HomeController);

	/////////////////////////////////////
	

	/////////////////////////////////////
	
	/// Work Module ///
	
	angular.module('app.work', []);

	function WorkConfig ($stateProvider) {
		$stateProvider.state("work", {
			url: "/work/:item",
			templateUrl: "work.html",
			controller: "WorkController",
			controllerAs: "vm",
			params: {
				item: { squash: true, value: null }
			}
		});
	}

	WorkConfig.$inject = ['$stateProvider'];

	angular.module('app.work').config(WorkConfig);


	function WorkController ($log) {
		$log.log("Work")
	}

	WorkController.$inject = ['$log'];

	angular.module('app.work').controller("WorkController", WorkController);

	/////////////////////////////////////


	/////////////////////////////////////
	
	/// Publication Module ///
	
	angular.module('app.publication', []);

	function PublicationConfig ($stateProvider) {
		$stateProvider.state("publication", {
			url: "/publication/:item",
			templateUrl: "publication.html",
			controller: "PublicationController",
			controllerAs: "vm",
			params: {
				item: { squash: true, value: null }
			}
		});
	}

	PublicationConfig.$inject = ['$stateProvider'];

	angular.module('app.publication').config(PublicationConfig);


	function PublicationController ($log) {
		$log.log("Publication")
	}

	PublicationController.$inject = ['$log'];

	angular.module('app.publication').controller("PublicationController", PublicationController);

	/////////////////////////////////////
	
	/// Profile Module ///
	
	angular.module('app.profile', []);

	function ProfileConfig ($stateProvider) {
		$stateProvider.state("profile", {
			url: "/profile",
			templateUrl: "profile.html",
			controller: "ProfileController",
			controllerAs: "vm"
		});
	}

	ProfileConfig.$inject = ['$stateProvider'];

	angular.module('app.profile').config(ProfileConfig);


	function ProfileController ($log) {
		$log.log("Profile")
	}

	ProfileController.$inject = ['$log'];

	angular.module('app.profile').controller("ProfileController", ProfileController);

	/////////////////////////////////////


})(angular);
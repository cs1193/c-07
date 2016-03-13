(function (angular) {

	'use strict';

	angular.module("app", ["ui.router", "app.home", "app.work", "app.publication", "app.profile", "app.contact"]);

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

	function UpdateTitle ($rootScope, $timeout) {
		var directive = {
			link: link
		};

		return directive;

		function link (scope, element, attrs) {
			var listener = function (event, toState, toParams, fromState, fromParams) {
				$timeout(function () {
					$rootScope.title = (toState.title) ? toState.title + " | Chandresh Rajkumar Manonmani" : "Chandresh Rajkumar Manonmani";
				});
			};

			$rootScope.$on('$stateChangeSuccess', listener);
		}
	}

	UpdateTitle.$inject = ['$rootScope', '$timeout'];

	angular.module('app').directive('title', UpdateTitle);


	/////////////////////////////////////
	
	/// Home Module ///
	
	angular.module('app.home', []);

	function HomeConfig ($stateProvider) {
		$stateProvider.state("home", {
			url: "/",
			templateUrl: "home.html",
			controller: "HomeController",
			controllerAs: "vm",
			title: "Home"
		});
	}

	HomeConfig.$inject = ['$stateProvider'];

	angular.module('app.home').config(HomeConfig);


	function HomeController ($log, $rootScope) {
		$log.log("Home");
		$rootScope.showFooterMenu = false;
	}

	HomeController.$inject = ['$log', '$rootScope'];

	angular.module('app.home').controller("HomeController", HomeController);

	/////////////////////////////////////
	

	/////////////////////////////////////
	
	/// Work Module ///
	
	angular.module('app.work', ['hljs']);

	function WorkConfig ($stateProvider, hljsServiceProvider) {
		$stateProvider.state("work", {
			url: "/work/:item",
			templateUrl: "work.html",
			controller: "WorkController",
			controllerAs: "vm",
			title: "Work",
			params: {
				item: { squash: true, value: null }
			}
		});

		hljsServiceProvider.setOptions({
			// replace tab with 4 spaces
			tabReplace: '    '
		});
	}

	WorkConfig.$inject = ['$stateProvider', 'hljsServiceProvider'];

	angular.module('app.work').config(WorkConfig);


	function WorkController ($log, $stateParams, WorkService, $rootScope, $sce) {
		$log.log("Work", $stateParams.item);

		$rootScope.showFooterMenu = true;

		var self = this;
		if($stateParams.item) {
			this.showList = false;
			WorkService.getDataByKey($stateParams.item).then(function (response) {
				self.workData = response;
				self.workDataDescription = self.workData.datadescription ? $sce.trustAsHtml(self.workData.datadescription) : null;
				$log.log(response);
			}, function (error) {
				$log.error(error);
			});
		} else {
			this.showList = true;
		}

	}

	WorkController.$inject = ['$log', '$stateParams', 'WorkService', '$rootScope', '$sce'];

	angular.module('app.work').controller("WorkController", WorkController);

	function WorkService ($http, $log, $q) {

		this.getDataByKey = function (key) {
			$log.log(key);
			var deferred = $q.defer();
			$http.get("/work/" + key + "/data.json").then(function(response) {
				deferred.resolve(response.data);
			}, function (error) {
				deferred.resolve(error);
			});

			return deferred.promise;
		};

	}

	WorkService.$inject = ['$http', '$log', '$q'];

	angular.module('app.work').service('WorkService', WorkService);


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
			title: "Publication",
			params: {
				item: { squash: true, value: null }
			}
		});
	}

	PublicationConfig.$inject = ['$stateProvider'];

	angular.module('app.publication').config(PublicationConfig);


	function PublicationController ($log, $rootScope) {
		$log.log("Publication");
		$rootScope.showFooterMenu = true;
	}

	PublicationController.$inject = ['$log', '$rootScope'];

	angular.module('app.publication').controller("PublicationController", PublicationController);

	/////////////////////////////////////
	
	/// Profile Module ///
	
	angular.module('app.profile', []);

	function ProfileConfig ($stateProvider) {
		$stateProvider.state("profile", {
			url: "/profile",
			templateUrl: "profile.html",
			controller: "ProfileController",
			controllerAs: "vm",
			title: "Profile"
		});
	}

	ProfileConfig.$inject = ['$stateProvider'];

	angular.module('app.profile').config(ProfileConfig);


	function ProfileController ($log, $rootScope) {
		$log.log("Profile");
		$rootScope.showFooterMenu = true;

		var margin = {top: 50, right: 50, bottom: 50, left: 50},
			width = Math.min(300, window.innerWidth - 10) - margin.left - margin.right,
			height = Math.min(width, window.innerHeight - margin.top - margin.bottom - 20);
	

		var data = [
			[
				{axis:"Programming",value:0.65},
				{axis:"Database",value:0.50},
				{axis:"Operating System",value:0.60},
				{axis:"Framework",value:0.65},
				{axis:"Software & Tools",value:0.40},
				{axis:"IDE",value:0.45},
				{axis:"Cloud Service",value:0.25}	
			]
		];

		var front = [
			[
				{axis:"Coding",value:0.60},
				{axis:"Design",value:0.25},
				{axis:"Tools",value:0.55},
				{axis:"Framework",value:0.65}
			]
		];
		
		var color = d3.scale.ordinal()
			.range(["#696969"]);
			
		var radarChartOptions = {
		  w: width,
		  h: height,
		  margin: margin,
		  maxValue: 1.0,
		  levels: 5,
		  roundStrokes: true,
		  color: color
		};

		var frontcolor = d3.scale.ordinal()
			.range(["#696969"]);

		var frontRadarChartOptions = {
		  w: width,
		  h: height,
		  margin: margin,
		  maxValue: 1.0,
		  levels: 5,
		  roundStrokes: true,
		  color: frontcolor
		};
		//Call function to draw the Radar chart
		RadarChart(".generalSkillChart", data, radarChartOptions);
		RadarChart(".frontDevelopmentSkillChart", front,  frontRadarChartOptions);
	}

	ProfileController.$inject = ['$log', '$rootScope'];

	angular.module('app.profile').controller("ProfileController", ProfileController);

	/////////////////////////////////////
	
	/////////////////////////////////////
	
	/// Contact Module ///
	
	angular.module('app.contact', []);

	function ContactDirective () {

		var directive = {
			link: link,
			templateUrl: "contact.html",
			restrict: 'EA'
		};

		return directive;

		function link (scope, element, attrs) {
			/* */
		}
	}

	ContactDirective.$inject = [];

	angular.module('app.contact').directive("contact", ContactDirective);


	/////////////////////////////////////



})(angular);
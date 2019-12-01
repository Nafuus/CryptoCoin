  Vue.component('line-chart', {
	extends: VueChartJs.Line,

	mixins: [VueChartJs.mixins.reactiveProp],
	props: ['chartData'],
	created () {
	  this.renderChart(this.chartData, {responsive: true, maintainAspectRatio: false})
	}
  })

new Vue({
	el:'#app',
	vuetify: new Vuetify(),
	  data: () => ({
		days:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],
		price:{},
		chartDataBTC:{labels: [],datasets: []},
		chartDataETH:{labels: [],datasets: []},
		chartDataXRP:{labels: [],datasets: []},
	}),
	methods:{
	  funfun(){
		console.log(this.price)
	  }
	},
	created: function () {   
	   const vm = this;
	  axios.get('https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,ETH,XRP,&tsyms=USD,EUR,RUB')
	  .then(response => this.price = response.data)
	  .catch(function (error) {
		console.log(error);
	  });

	  axios.get('https://min-api.cryptocompare.com/data/v2/histoday?fsym=BTC&tsym=USD&limit=30')
	  .then(response => {
	  	const history = [];
		response.data.Data.Data.forEach(function(a) {
		  history.push(a.high)
		});
		vm.chartDataBTC = {
			labels: vm.days,
			datasets: [{label: 'Цена в USD',data: history}]
		}
	  })
	  .catch(function (error) {
		console.log(error);
	  });

	  axios.get('https://min-api.cryptocompare.com/data/v2/histoday?fsym=ETH&tsym=USD&limit=30')
	  .then(response => {
	  	const history = [];
		response.data.Data.Data.forEach(function(a) {
		  history.push(a.high)
		});
		vm.chartDataETH = {
			labels: vm.days,
			datasets: [{label: 'Цена в USD',data: history}]
		}
	  })
	  .catch(function (error) {
		console.log(error);
	  });
	  axios.get('https://min-api.cryptocompare.com/data/v2/histoday?fsym=XRP&tsym=USD&limit=30')
	  .then(response => {
	  	const history = [];
		response.data.Data.Data.forEach(function(a) {
		  history.push(a.high)
		});
		vm.chartDataXRP = {
			labels: vm.days,
			datasets: [{label: 'Цена в USD',data: history}]
		}
	  })
	  .catch(function (error) {
		console.log(error);
	  });
	}
  })
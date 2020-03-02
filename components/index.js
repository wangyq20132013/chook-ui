export default {
	install: function(Vue) {
		const fileLoader = require.context('./', true, /.*\/(.*?)\.vue/);
		fileLoader.keys().forEach(path => {
			const fName = path.match(/.*\/(.*?)\.vue/)[1];
			const component = fileLoader(path).default;
			Vue.component(fName, component)
		});
	}
}

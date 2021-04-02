module.exports = function (htmlWebpackPlugin, title) {
  return `
 <!doctype html>
 <html lang="zh-cn">
 <head>
	 <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
	 <meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no,minimal-ui,viewport-fit=cover">
	 <meta name="format-detection" content="telephone=no, email=no"><meta name="apple-mobile-web-app-capable" content="yes">
	 <meta name="apple-touch-fullscreen" content="yes">
	 ${htmlWebpackPlugin.tags.headTags}
	 <title>${title}</title>
 </head>
 <body>
	 <div id='root'></div>
		 ${htmlWebpackPlugin.tags.bodyTags}
		 </body>
 </html>
 `;
};

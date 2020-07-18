export default (markup, css) => {
    return `
        <!doctype html>
        <html lang="en">
            <head>
                <meta charset = "utf-8">
                <title> My Social Media</title>
                <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:100,300,400">
                <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
                <style>
                    a{
                        text-decoration: none;
                        color: #061d95
                    }
                </style>
            </head>
            <body style="margin:0">
                <div id="root">${markup}</div>
                <style id="jss-server-side">${css}</style>
                <script type="text/javascript" src="/dist/bundle.js"></script>
            </body>
        </html>
    `
}
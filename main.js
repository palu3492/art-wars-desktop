const electron = require('electron');
const url = require('url');
const path = require('path');

const {app, BrowserWindow, Menu, ipcMain} = electron;

// Set ENV
process.env.NODE_ENV = 'production';

let mainWindow;
let addWindow;

// Listen for app to be ready
app.on('ready', function(){
    // Create new window
    mainWindow = new BrowserWindow({
        width: 1100,
        height: 600,
        title: 'Art Wars'
    });
    // Load html into window
    // file://DIR/mainWindow.html
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'gameWindow.html'),
        protocol: 'file:',
        slashes: true
    }));
    // Quit app on close clicked
    mainWindow.on('closed', function(){
        app.quit();
    });

    // Disable menu
    mainWindow.setMenu(null);
});

// Handle create window
// function createAddWindow(){
//     addWindow = new BrowserWindow({
//         width: 300,
//         height: 200,
//         title: 'Add shopping list item'
//     });
//     // Load html into window
//     // file://DIR/mainWindow.html
//     addWindow.loadURL(url.format({
//         pathname: path.join(__dirname, 'addWindow.html'),
//         protocol: 'file:',
//         slashes: true
//     }));
//
//     // Garbage collection
//     addWindow.on('close', function(){
//         addWindow = null;
//     });
// }

// Catch items from add menu
// ipcMain.on('item:add', function(e, item){
//     mainWindow.webContents.send('item:add', item);
//     addWindow.close();
// });

// Create menu template
// Overwrites default menu
// const mainMenuTemplate = [
//     {
//         label:'File',
//         submenu: [
//             {
//                 label: 'Add Item',
//                 click(){
//                     createAddWindow();
//                 }
//             },
//             {
//                 label: 'Clear Items',
//                 click(){
//                     mainWindow.webContents.send('item:clear');
//                 }
//             },
//             {
//                 label: 'Quit',
//                 accelerator: process.platform === 'darwin' ? 'Command+Q' : 'Ctrl+Q',
//                 click(){
//                     app.quit();
//                 }
//             }
//         ]
//     }
// ];

// If mac, add empty object to main menu
// if(process.platform === 'darwin'){
//     mainMenuTemplate.unshift({});
// }

// Add developer tools if not in production
// if(process.env.NODE_ENV !== 'production'){
//     mainMenuTemplate.push({
//         label: 'Developer tools',
//         submenu: [
//             {
//                 label: 'Toggle DevTools',
//                 accelerator: process.platform === 'darwin' ? 'Command+I' : 'Ctrl+I',
//                 click(item, focusedWindow){
//                     focusedWindow.toggleDevTools();
//                 }
//             },
//             {
//                 role: 'reload'
//             }
//         ]
//     });
// }
# Offline-Web-App
 https://jucuacc.github.io/Offline-Web-App/

This Project demonstrates 4 types of Web storage for offline web application. They are: 1. Web SQL, 2. Local Storage, 3. Session Storage, 4. IndexedDB.

Here is a brief description of the above mentioned storages:

====================================================================== Local Storage and Session Storage

Local Storage Shares data across all windows and tabs within the same origin. Other tabs and windows can subscribe to storage events to receive notifications when a change occurs to localStorage.

Session Storage Data is sandboxed to only the current tab or window and is cleared when closed. Because sessionStorage data is not shared beyond the current tab or window, others will not receive notifications when a change occurs.

Only storage for string values is currently supported within web storage, but storage for more complex objects can be achieved by using the JSON.stringify() and JSON. parse() utility methods.

====================================================================== Web SQL

Web SQL is used when targeting specific platforms. Current browser implementations are based on SQLite, which gives you all the power of a full relational database.

====================================================================== IndexedDB

IndexedDB is a key-based object database available in most current browsers. Databases contain object stores, which are somewhat equivalent to table structures in a relational database. Each object store has a designated key path that identifies its key.

All operations are performed through transactions, which can be read-only or read/ write. Read-only operations can run concurrently.

An object store’s add method can be used only for adding new records, but its put method can be used for new or existing records. Its delete method removes records.

======================================================================

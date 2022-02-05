﻿/// <reference path="jquery-3.3.1.min.js" />

window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
window.IDBTransaction = window.IDBTransaction || window.IDBTransaction || window.webkitIDBTransaction;
window.IDBCursor = window.IDBCursor || window.webkitIDBCursor;



$(document).ready(function () {
    contactsNamespace.initialize();
});

(function () {
    this.contactsNamespace = this.contactsNamespace || {};
    var ns = this.contactsNamespace;
    var currentRecord;
    var db;

    ns.initialize = function () {
        $('#btnSave').on('click', ns.save);
        var request = indexedDB.open("Student_Info", 1)

        request.onupgradeneeded = function (response) {
            var options = { keypath: "id", autoIncrement: true };
            response.currentTarget.result.createObjectStore("contacts", options);
        };

        request.onsuccess = function (response) {
            db = request.result;
            ns.display();
        }
    };

    function retrieveFromStorage() {
        var contactsJSON = localStorage.getItem('contacts');
        return contactsJSON ? JSON.parse(contactsJSON) : [];
    }


    ns.display = function () {
        $('#currentAction').html('Add Contact');
        currentRecord = { key: null, contact: {} };
        displayCurrentRecord();
        var results = retrieveFromStorage();
        bindToGrid(results);
    };


    function bindToGrid(results) {
        var html = '';
        for (var i = 0; i < results.length; i++) {
            var contact = results[i];
            html += '<tr><td>' + contact.email + '</td>';
            html += '<td>' + contact.firstName + ' ' + contact.lastName + '</td>';
            html += '<td>' + contact.phoneNumber + '</td>';
            html += '<td>' + contact.address + '</td>';
            html += '<td>' + contact.file + '</td>';
            html += '<td><a class="edit" href="javascript:void(0)" data-key='
                + i + '>Edit</a></td></tr>';
        }
        html = html || '<tr><td colspan="3">No records available</td></tr>';
        $('#contacts tbody').html(html);
        $('#contacts a.edit').on('click', ns.loadContact);
    }



    ns.loadContact = function () {
        var key = parseInt($(this).attr('data-key'));
        var results = retrieveFromStorage();
        $('#currentAction').html('Edit Contact');
        currentRecord = { key: key, contact: results[key] }
        displayCurrentRecord();
    };


    function displayCurrentRecord() {
        var contact = currentRecord.contact;
        $('#firstName').val(contact.firstName);
        $('#lastName').val(contact.lastName);
        $('#email').val(contact.email);
        $('#phoneNumber').val(contact.phoneNumber);
        $('#address').val(contact.address);
        $('#file').val(contact.file);
    }


    ns.save = function () {
        var contact = currentRecord.contact;
        contact.firstName = $('#firstName').val();
        contact.lastName = $('#lastName').val();
        contact.email = $('#email').val();
        contact.phoneNumber = $('#phoneNumber').val();
        contact.address = $('#address').val();
        contact.file = $('#file').val();

        var results = retrieveFromStorage();
        if (currentRecord.key != null) {
            results[currentRecord.key] = contact;
        }
        else {
            results.push(contact);
        }
        localStorage.setItem('contacts', JSON.stringify(results));
        ns.display();
    };
})();
/// <reference path="jquery-3.3.1.min.js" />

$(document).ready(function () {
    contactsNamespace.initialize();
});


(function () {
    this.contactsNamespace = this.contactsNamespace || {};
    var ns = this.contactsNamespace;
    var currentRecord;

    ns.initialize = function () {
        $('#btnSave').on('click', ns.save);
        ns.display();

    };


    function retrieveFromStorage() {
        var contactsJSON = localStorage.getItem('contacts');
        return contactsJSON ? JSON.parse(contactsJSON) : [];
    }

    ns.display = function () {
        $('#currentAction').html('Add Student');
        currentRecord = { key: null, contact: {} };
        displayCurrentRecord();

        var result = retrieveFromStorage();

        bindToGrid(result);
    };

    function bindToGrid(result) {
        var html = '';
        for (var i = 0; i < result.length; i++) {
            var contact = result[i];
            html += '<tr><td>' + contact.email + '</td>';
            html += '<td>' + contact.phoneNumber + '</td>';
            html += '<td>' + contact.firstName + ' ' + contact.lastName + '</td>';
            html += '<td>' + contact.files + '</td>';
            html += '<td> <a class="edit" href="javascript:void(0)" data-key=' + i + '>Edit</a></td></tr>';

        }

        html = html || '<tr><td colspan="3">No Records Available Here!!</td></tr>';
        $('#contacts tbody').html(html);
        $('#contacts a.edit').on('click', ns.loadContact);
    };

    ns.loadContact = function () {
        var key = parseInt($(this).attr('data-key'));
        var result = retrieveFromStorage();
        $('#currentAction').html('Edit Student Info');
        currentRecord = { key: key, contact: result[key] };
        displayCurrentRecord();

    }

    function displayCurrentRecord() {
        var contact = currentRecord.contact;
        $('#firstName').val(contact.firstName);
        $('#lastName').val(contact.lastName);
        $('#email').val(contact.email);
        $('#phoneNumber').val(contact.phoneNumber);
        $('#files').val(contact.files);

    }


    ns.save = function () {
        var contact = currentRecord.contact;
        contact.firstName = $('#firstName').val();
        contact.lastName = $('#lastName').val();
        contact.email = $('#email').val();
        contact.phoneNumber = $('#phoneNumber').val();
        contact.files = $('#files').val();

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
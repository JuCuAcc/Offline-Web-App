
class MyHeader extends HTMLElement {
    connectedCallback() {
        this.innerHTML =
`
            <div>
            <header>
                <a href="Home.html">
                    <img src="../images/home.jpg" width= "80px" height= "90px"/>
                </a>
                <nav>
                    <ul>
                        <li><a href="Home.html">Home</a></li>
                        <li><a href="MyWebSQL.html">WebSql</a></li>
                        <li><a href="MyLocalStorage.html">Local Storage</a></li>
                        <li><a href="MySessionlStorage.html">Session Storage</a></li>
                        <li><a href="MyIndexedDB.html">IndexedDB</a></li>
                    </ul>
                </nav>
            </header >
            </div>
 `
    }
}

customElements.define('my-header', MyHeader);

// For Tooltip
$(document).ready(function () {
    $('.tTip').hover(function (event) {
        // mouse hover
        var spanText = $(this).next().html();

        $('<p class="toolTip"></p>')
            .text(spanText)
            .appendTo('body')
            .css('top', (event.pageY - 40) + 'px')
            .css('left', (event.pageX + 20) + 'px')
            .fadeIn('slow');
    }, function () {
        $('.toolTip').remove();
    }).mousemove(function (event) {
        // when mouse move
        $('.toolTip')
            .css('top', (event.pageY - 40) + 'px')
            .css('left', (event.pageX + 20) + 'px');
    });
});






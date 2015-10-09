redactor-charts
===============

A (Chart.js)[http://www.chartjs.org] plugin for (Redactor)[http://imperavi.com/redactor].

Prerequisites
-------------

(Redactor)[http://imperavi.com/redactor/download/] is NOT FREE. So you may need to consider buying a license before using it on your website.


Installing with (Bower)[http://bower.io]
----------------------------------------

```
$ bower install redactor-charts
```

Enabling plugin
---------------

First you need to include `Chart.js` and `charts.js` on your page.

```
<script src="Chart.js"></script>
<script src="charts.js"></script>

```

Then simply enable the `charts` pluin when you initialize Redactor.

```js
<script type="text/javascript">
    $(function()
    {
        $('#redactor').redactor({
            focus: true,
            plugins: ['charts']
        });
    });
</script>
```

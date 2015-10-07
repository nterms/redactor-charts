var redactorChart;

$.Redactor.prototype.charts = function()
{
    return {
        init: function()
        {
            var button = this.button.add('charts-button', 'Charts');
            this.button.setAwesome('charts-button', 'fa-area-chart');
            this.button.addCallback(button, this.charts.show);
            this.charts.loadStyles();
        },
        show: function()
        {
            this.modal.addTemplate('charts', this.charts.getTemplate());
            this.modal.load('charts', 'Chart', 700);
            this.modal.createCancelButton();
            var insert = this.modal.createActionButton('insert');
            insert.on('click', this.charts.insert);
            this.selection.save();
            this.modal.show();
            this.charts.prepareModal();
        },
        getTemplate: function()
        {
            return String()
            + '<section id="redactor-modal-charts">'

                + '<div class="section">'
                    + '<div class="chart-wrapper">'
                        + '<div class="chart-container">'
                            + '<canvas id="redactor-charts-chart"></canvas>'
                        + '</div>'
                    + '</div>'
                + '</div>'

                + '<div class="section">'
                    + '<h3>Data</h3>'
                    + '<div class="data">'
                        + '<table class="data-table table table-bordered">'
                            + '<tr>'
                                + '<th>Labels</th>'
                                + '<th>Data Set - <span>1</span></th>'
                                + '<td class="button-cell"><button id="redactor-charts-adddataset" class="redactor-modal-button">Add Data Set</button></td>'
                            + '</tr>'
                            + '<tr>'
                                + '<td><input /></td>'
                                + '<td><input /></td>'
                                + '<td class="button-cell"><a href="#" class="remove-row">Remove row</a></td>'
                            + '</tr>'
                            + '<tr>'
                                + '<td><input /></td>'
                                + '<td><input /></td>'
                                + '<td class="button-cell"><a href="#" class="remove-row">Remove row</a></td>'
                            + '</tr>'
                            + '<tr>'
                                + '<td><input /></td>'
                                + '<td><input /></td>'
                                + '<td class="button-cell"><a href="#" class="remove-row">Remove row</a></td>'
                            + '</tr>'
                            + '<tr>'
                                + '<td class="button-cell"><button id="redactor-charts-addrow" class="redactor-modal-button">Add Row</button></td>'
                                + '<td class="button-cell"><a href="#" class="remove-column">Remove column</a></td>'
                                + '<td></td>'
                            + '</tr>'
                        + '</table>'
                    + '</div>'
                + '</div>'

                + '<div class="section">'
                    + '<h3>Chart Options</h3>'
                    + '<div class="Options">'
                        + '<table class="options-table">'
                            + '<tr>'
                                + '<th>Width</th>'
                                + '<td><input id="redactor-charts-width" /></td>'
                                + '<th>Height</th>'
                                + '<td><input id="redactor-charts-height" /></td>'
                            + '</tr>'
                            + '<tr>'
                                + '<th>Type</th>'
                                + '<td>'
                                    + '<select id="redactor-charts-type" >'
                                        + '<option value="bar">Bar</option>'
                                        + '<option value="doughnut">Doughnut</option>'
                                        + '<option value="radar">Radar</option>'
                                        + '<option value="line">Line</option>'
                                        + '<option value="polar-area">Polar Area</option>'
                                    + '</select>'
                                + '</td>'
                                + '<th></th>'
                                + '<td></td>'
                            + '</tr>'
                            + '<tr>'
                                + '<td colspan="4"><button id="redactor-charts-options-update">Apply</button></td>'
                            + '</tr>'
                        + '</table>'
                    + '</div>'
                + '</div>'

            + '</section>';
        },
        loadStyles: function()
        {
            var style = $('<style>').attr({type: 'text/css'});
            var css = String()
                + '#redactor-modal select { min-height: 24px; } '
                + '#redactor-modal table { width: 100% } '
                + '#redactor-modal table.data-table { min-width: 100%; width: auto; } '
                + '#redactor-modal table.data-table td { min-width: 100px; } '
                + '#redactor-modal table td, #redactor-modal table th { padding: 6px; } '
                + '#redactor-modal table td.button-cell { text-align: center; } '
                + '#redactor-modal table td.button-cell a { font-size: small; } '
                + '#redactor-modal .table-bordered { border-collpased: collapsed; } '
                + '#redactor-modal .table-bordered, #redactor-modal .table-bordered td, #redactor-modal .table-bordered th { border: 1px solid #DDD; } '
                + '#redactor-modal table td input { width: 100%; } '
                + '#redactor-modal .chart-container { border: 1px solid #DDD; overflow: auto; max-height: 300px; max-width: 100%; } '
                + '#redactor-modal canvas { height: 160px; width: 100%; } '
                + '#redactor-modal .data { overflow: auto; max-height: 300px; max-width: 100%; } '
                + '.redactor-modal-button { width: 100%; }';
            style.append(css)
            $('head').append(style);
        },
        prepareModal: function()
        {
            var charts = this.charts;

            $('#redactor-charts-options-update').on('click', function() {
                charts.draw();
            });

            $('#redactor-charts-adddataset').on('click', function() {
                var table = $('#redactor-modal-charts .data-table');
                var rows = table.find('tr');

                rows.each(function(i, el) {
                    var index = ($(el).find('th').length);
                    if(i == 0) {
                        $(el).find('td:last').before($('<th>').html('Data Set - <span>' + index + '</span>'));
                    } else if(i < (rows.length - 1)) {
                        $(el).find('td:last').before($('<td>').html('<input />'));
                    } else {
                        $(el).find('td:last').before($('<td>').addClass('button-cell').html('<a href="#" class="remove-column">Remove column</a>'));
                    }
                });
            });

            $('#redactor-charts-addrow').on('click', function() {
                var row = $('<tr>');
                var columns = $('#redactor-modal-charts .data-table tr:first th').length;

                for(var i = 0; i < columns; i++) {
                    row.append('<td><input /></td>');
                }
                row.append('<td class="button-cell"><a href="#" class="remove-row">Remove row</a></td>');

                $('#redactor-modal-charts .data-table tr:last').before(row);
            });

            $('#redactor-modal-charts .data-table').on('click', 'a.remove-row', function(evt) {
                evt.preventDefault();
                $(this).closest('tr').remove();
            });

            $('#redactor-modal-charts .data-table').on('click', 'a.remove-column', function(evt) {
                evt.preventDefault();
                var rows = $('#redactor-modal-charts .data-table tr');
                var index = $(this).closest('tr').find('a.remove-column').index(this) + 1;
                rows.each(function(i, el) {
                    if(i == 0) {
                        $(el).find('th').eq(index).remove();
                        $(el).find('th').each(function(j, th) {
                            if(j == 0) return true;

                            $(th).find('span').text(j);
                        });
                    } else {
                        $(el).find('td').eq(index).remove();
                    }
                });
            });
        },
        fetchData: function(type) {
            var labels = [];
            $('#redactor-modal-charts .data-table tr').each(function(i, tr) {
                if(i == 0) {

                } else {
                    labels.push($(tr).find('input:first').val());
                }

            });
        },
        draw: function()
        {
            if(redactorChart != null) {
                redactorChart.destroy();
            }

            $('#redactor-modal-charts canvas').css({
                width: $('#redactor-charts-width').val(),
                height: $('#redactor-charts-height').val()
            });

            var ctx = $('#redactor-modal-charts canvas').get(0).getContext('2d');
            var chart = new Chart(ctx);
            var type = $('#redactor-charts-type').val();
            var data = this.charts.fetchData(type);

            switch(type) {
                case 'bar':
                    redactorChart = chart.Bar(data);
                    break;
                case 'doughnut':
                    redactorChart = chart.Doughnut(data);
                    break;
                case 'radar':
                    redactorChart = chart.Radar(data);
                    break;
                case 'line':
                    redactorChart = chart.Line(data);
                    break;
                case 'polar-area':
                    redactorChart = chart.PolarArea(data);
                    break;
            }
        },
        insert: function()
        {
            var canvas = $('#redactor-modal-charts canvas');
            var img = $('<img>').css({height: canvas.height(), width: canvas.width()}).attr('src', canvas.get(0).toDataURL()).prop('outerHTML');

            this.modal.close();
            this.selection.restore();
            this.insert.html(img);
            this.code.sync();
        }
    };
}

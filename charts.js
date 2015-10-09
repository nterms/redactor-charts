var redactorChart;
var redactorSelectedColorSelector;

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
                                + '<th><a href="#" data-color="#999999" class="color-selector" title="Select the color of the chart"></a> Data Set - <span>1</span></th>'
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
                                        //+ '<option value="pie">Pie</option>'
                                        //+ '<option value="doughnut">Doughnut</option>'
                                        + '<option value="radar">Radar</option>'
                                        + '<option value="line">Line</option>'
                                        //+ '<option value="polar-area">Polar Area</option>'
                                    + '</select>'
                                + '</td>'
                                + '<th></th>'
                                + '<td></td>'
                            + '</tr>'
                            + '<tr>'
                                + '<td colspan="4"><br/></td>'
                            + '</tr>'
                            + '<tr>'
                                + '<td colspan="4"><button id="redactor-charts-options-update">Preview</button></td>'
                            + '</tr>'
                        + '</table>'
                        + '<p class="hint">Charts are inserted to the editor in image format. Once insterted, chart cannot be edited again. Please make sure your chart is complete before inserting.</p>'
                    + '</div>'
                + '</div>'

                + '<div id="redactor-charts-color-box" class="color-box">'
                    + '<div class="swatches">'
                        + '<div class="swatch" title="#f3cdc2"></div>'
                        + '<div class="swatch" title="#f8e0c8"></div>'
                        + '<div class="swatch" title="#fbf3cf"></div>'
                        + '<div class="swatch" title="#c2ddd8"></div>'
                        + '<div class="swatch" title="#d1eaf1"></div>'
                        + '<div class="swatch" title="#e49c90"></div>'
                        + '<div class="swatch" title="#edc297"></div>'
                        + '<div class="swatch" title="#f4e19f"></div>'
                        + '<div class="swatch" title="#86bbb5"></div>'
                        + '<div class="swatch" title="#a7d0e2"></div>'
                        + '<div class="swatch" title="#d66c5e"></div>'
                        + '<div class="swatch" title="#e1a368"></div>'
                        + '<div class="swatch" title="#eece77"></div>'
                        + '<div class="swatch" title="#4f988f"></div>'
                        + '<div class="swatch" title="#7cb9d5"></div>'
                        + '<div class="swatch" title="#c64233"></div>'
                        + '<div class="swatch" title="#d88342"></div>'
                        + '<div class="swatch" title="#e9c056"></div>'
                        + '<div class="swatch" title="#1c7873"></div>'
                        + '<div class="swatch" title="#53a1c7"></div>'
                        + '<div class="swatch" title="#93322b"></div>'
                        + '<div class="swatch" title="#9e6337"></div>'
                        + '<div class="swatch" title="#a98d43"></div>'
                        + '<div class="swatch" title="#165753"></div>'
                        + '<div class="swatch" title="#3f7990"></div>'
                        + '<div class="swatch" title="#592420"></div>'
                        + '<div class="swatch" title="#624025"></div>'
                        + '<div class="swatch" title="#6a5b30"></div>'
                        + '<div class="swatch" title="#163935"></div>'
                        + '<div class="swatch" title="#294c5f"></div>'
                        + '<div class="swatch" title="#000000"></div>'
                        + '<div class="swatch" title="#333333"></div>'
                        + '<div class="swatch" title="#666666"></div>'
                        + '<div class="swatch" title="#999999"></div>'
                        + '<div class="swatch" title="#cccccc"></div>'
                    + '</div>'
                    + '<div class="hex">'
                        + '<input type="text" size="7" id="redactor-charts-color-hex" />'
                        + '<button id="redactor-charts-color-apply">Apply</button>'
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
                + '#redactor-modal table td, #redactor-modal table th { padding: 6px; white-space: nowrap; } '
                + '#redactor-modal table td.button-cell { text-align: center; } '
                + '#redactor-modal table td.button-cell a { font-size: small; } '
                + '#redactor-modal .table-bordered { border-collpased: collapsed; } '
                + '#redactor-modal .table-bordered, #redactor-modal .table-bordered td, #redactor-modal .table-bordered th { border: 1px solid #DDD; } '
                + '#redactor-modal table td input { width: 100%; } '
                + '#redactor-modal .chart-container { border: 1px solid #DDD; overflow: auto; max-height: 300px; max-width: 100%; } '
                + '#redactor-modal canvas { height: 160px; width: 100%; } '
                + '#redactor-modal .data { overflow: auto; max-height: 300px; max-width: 100%; } '
                + '#redactor-charts-color-box { background-color: #FFF; border: 1px solid #DDD; box-shadow: 4px 4px 20px #999; position: absolute; width: 174px; z-index: 99999; } '
                + '#redactor-charts-color-box .swatches { margin: 20px 12px 12px 20px; } '
                + '#redactor-charts-color-box .swatch { cursor: pointer; float: left; height: 16px; margin: 0 8px 8px 0; width: 20px; } '
                + '#redactor-charts-color-box .hex { margin: 0 20px 20px; } '
                + '#redactor-charts-color-box .hex input { width: 100%; } '
                + '#redactor-charts-color-box .hex button { margin-top: 10px; width: 100%; } '
                + '#redactor-modal .color-selector { background-color: #999999; border-radius: 50%; display: inline-block; height: 20px; vertical-align: middle; width: 20px; } '
                + '#redactor-modal .hint { color: #888; font-size: small; max-width: 100%; } '
                + '.redactor-modal-button { width: 100%; }';
            style.append(css)
            $('head').append(style);
        },
        prepareModal: function()
        {
            var charts = this.charts;

            $('#redactor-charts-color-box .swatch').each(function(i, el) {
                var color = $(el).attr('title');
                $(el).css('background-color', color);

                $(el).hover(function() {
                    $('#redactor-charts-color-box .hex input').val(color);
                }).click(function() {
                    $('#redactor-charts-color-apply').click();
                });
            });

            $('#redactor-charts-color-box').hide();

            $('#redactor-charts-color-box').on('click', function(evt) {
                evt.preventDefault();
                evt.stopPropagation();
            });

            $(document).on('click', '.color-selector', function(evt) {
                evt.preventDefault();
                evt.stopPropagation();

                var pos = $(this).position();
                pos.y = pos.y + 24;

                $('#redactor-charts-color-box').show().css(pos);
                redactorSelectedColorSelector = this;
            });

            $('#redactor-charts-color-apply').click(function(evt) {
                var color = $('#redactor-charts-color-box .hex input').val();
                console.log('clicked');
                $(redactorSelectedColorSelector).css('background-color', color).data('color', color);
                $('#redactor-charts-color-box').hide();
                $('#redactor-charts-color-box').hide();
            });

            $('#redactor-modal').on('click', function() {
                $('#redactor-charts-color-box').hide();
            });

            $('#redactor-charts-options-update').on('click', function() {
                charts.draw();
            });
            $('#redactor-charts-adddataset').on('click', function() {
                var table = $('#redactor-modal-charts .data-table');
                var rows = table.find('tr');

                rows.each(function(i, el) {
                    var index = ($(el).find('th').length);
                    if(i == 0) {
                        $(el).find('td:last').before($('<th>').html('<a href="#" data-color="#999999" class="color-selector" title="Select the color of the chart"></a> Data Set - <span>' + index + '</span>'));
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
            var charts = this.charts;
            var labels = [];
            var dataSetLabels = [];
            var dataSets = [];
            var colors = [];
            $('#redactor-modal-charts .data-table tr').each(function(i, tr) {
                if(i == 0) {
                    $(tr).find('th').each(function(j, th) {
                        if(j == 0) return true;
                        var label = th.textContent || th.innerText || '';
                        var color = $(th).find('.color-selector').data('color');
                        dataSetLabels.push(label);
                        colors.push(color);
                    });
                } else {
                    $(tr).find('input').each(function(j, input) {
                        var value = $(input).val();

                        if(j == 0) {
                            if(typeof value != 'undefined') {
                                labels.push(value);
                            }
                        } else {
                            if(typeof dataSets[j] != 'undefined' && dataSets[j] instanceof Array) {
                                dataSets[j].push(value);
                            } else {
                                dataSets[j] = [value];
                            }
                        }
                    });
                }

            });
            console.log(dataSets);

            var chartDataSets = [];

            $.each(dataSetLabels, function(i, label) {
                var data = {};
                data.label = label;
                if(typeof colors[i] != 'undefined') {
                    var color = charts.hexToRgb(colors[i]);
                    data.fillColor = 'rgba(' + color.r + ',' + color.g + ',' + color.b + ', 0.5)';
                    data.strokeColor = 'rgba(' + color.r + ',' + color.g + ',' + color.b + ', 1)';
                    data.pointColor = 'rgba(' + color.r + ',' + color.g + ',' + color.b + ', 1)';
                    data.pointStrokeColor = '#FFFFFF';
                    data.pointHighlightFill = '#FFFFFF';
                    data.pointHighlightStroke = 'rgba(' + color.r + ',' + color.g + ',' + color.b + ', 1)';
                }
                data.data = (typeof dataSets[i+1] != 'undefined') ? dataSets[i+1] : [];

                chartDataSets.push(data);
            });

            return {
                labels: labels,
                datasets: chartDataSets
            };
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
            console.log(data);
            switch(type) {
                case 'bar':
                    redactorChart = chart.Bar(data);
                    break;
                case 'pie':
                    redactorChart = chart.Pie(data);
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
        },
        hexToRgb: function(hex) {
            // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
            var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
            hex = hex.replace(shorthandRegex, function(m, r, g, b) {
                return r + r + g + g + b + b;
            });

            var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
            return result ? {
                r: parseInt(result[1], 16),
                g: parseInt(result[2], 16),
                b: parseInt(result[3], 16)
            } : null;
        }
    };
}

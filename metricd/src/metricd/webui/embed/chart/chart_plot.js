/**
 * This file is part of the "FnordMetric" project
 *   Copyright (c) 2016 Laura Schlimmer, FnordCorp B.V.
 *   Copyright (c) 2016 Paul Asmuth, FnordCorp B.V.
 *
 * FnordMetric is free software: you can redistribute it and/or modify it under
 * the terms of the GNU General Public License v3.0. You should have received a
 * copy of the GNU General Public License along with this program. If not, see
 * <http://www.gnu.org/licenses/>.
 */

/**
 * Renders a chart and optionally a summary for the provided series
 *
 * @param elem   {HTMLElement} an HTML elem within the chart will be rendered
 * @param params {object}      the chart's configuration
 */
FnordMetricChart.Plotter = function(elem, params) {
  'use strict';

  var RENDER_SCALE_FACTOR = 1.6;
  var width;
  var width_real;
  var height;
  var height_real;
  var canvas_margin_top;
  var canvas_margin_right;
  var canvas_margin_bottom;
  var canvas_margin_left;
  var x_domain;
  var x_ticks_count;
  var y_ticks_count;
  var y_domain;
  var y_label_width;
  var y_labels;
  var ppoints = [];

  this.getScaledValues = function() {
    return ppoints;
  }

  this.render = function(result) {
    /* prepare axes */
    prepareXAxis(result);
    prepareYAxis(result);

    /* prepare layout */
    prepareLayout(result);

    preparePoints(result);

    /* draw the svg */
    draw(result);

    /* adjust the svg when the elem is resized */
    if (!params.width) {
      var resize_observer = new ResizeObserver(function(e) {
        prepareLayout(result);
        draw(result);
      });

      resize_observer.observe(elem);
    }
  }

  function preparePoints(result) {

    result.series.forEach(function(series) {
      for (var i = 0; i < series.values.length; i++) {
        var x = x_domain.convertDomainToScreen(series.time[i]);
        var x_screen = x * (width - (canvas_margin_left + canvas_margin_right)) + canvas_margin_left;

        if (series.values[i] === null) {
          ppoints.push({ x: x_screen, y: null, value: null});
        } else {
          var y = y_domain.convertDomainToScreen(series.values[i]);
          var y_screen = (1.0 - y) * (height - (canvas_margin_bottom + canvas_margin_top)) + canvas_margin_top;
          ppoints.push({x: x_screen, y: y_screen, value: series.values[i]});
        }
      }
    });

  }

  function prepareLayout(result) {
    width_real = params.width || elem.offsetWidth;
    width = width_real * RENDER_SCALE_FACTOR;
    height_real = params.height || elem.offsetHeight;
    height = height_real * RENDER_SCALE_FACTOR;

    canvas_margin_top = 6 * RENDER_SCALE_FACTOR;
    canvas_margin_right = 1 * RENDER_SCALE_FACTOR;
    canvas_margin_bottom = 18 * RENDER_SCALE_FACTOR;
    canvas_margin_left = 1 * RENDER_SCALE_FACTOR;

    /* fit the y axis labels */
    y_label_width =
        7 * RENDER_SCALE_FACTOR *
        Math.max.apply(null, y_labels.map(function(l) { return l.length; }));

    /* fit the y axis */
    if (params.axis_y_position == "inside") {

    } else {
      canvas_margin_left = y_label_width;
    }
  }

  function prepareXAxis(result) {
    x_ticks_count = 12;
    x_domain = new FnordMetricChart.PlotterLinearDomain;

    result.series.forEach(function(s) {
      x_domain.findMinMax(s.time);
    });
  }

  function prepareYAxis(result) {
    y_ticks_count = 5;
    y_domain = new FnordMetricChart.PlotterLinearDomain;

    result.series.forEach(function(s) {
      y_domain.findMinMax(s.values);
    });

    /* set up y axis labels */
    var y_values = []
    for (var i = 0; i <= y_ticks_count ; i++) {
      y_values.push(y_domain.convertScreenToDomain(1.0 - (i / y_ticks_count)));
    }

    y_labels = FnordMetricUnits.formatValues(result.unit, y_values);
  }

  function draw(result) {
    var svg = drawChart(result);
    elem.innerHTML = svg;
  }

  function drawChart(result) {
    var svg = new FnordMetric.SVGHelper();
    svg.svg += "<svg shape-rendering='geometricPrecision' class='fm-chart' viewBox='0 0 " + width + " " + height + "' style='width:" + width_real + "px;'>";

    drawBorders(svg);
    drawXAxis(svg);
    drawYAxis(result, svg);

    var series_idx = 0;
    result.series.forEach(function(s) {
      var color = FnordMetric.Colors.default[series_idx % FnordMetric.Colors.default.length];
      series_idx += 1;

      drawLine(s, svg, { color: color });

      if (params.points) {
        drawPoints(s, svg);
      }
    });

    svg.svg += "</svg>"
    return svg.svg;
  }

  function drawBorders(c) {
    /** render top border **/
    if (params.border_top) {
      c.drawLine(
          canvas_margin_left,
          width - canvas_margin_right,
          canvas_margin_top,
          canvas_margin_top,
          "border");
    }

    /** render right border  **/
    if (params.border_right) {
      c.drawLine(
          width - canvas_margin_right,
          width - canvas_margin_right,
          canvas_margin_top,
          height - canvas_margin_bottom,
          "border");
    }

    /** render bottom border  **/
    if (params.border_bottom) {
      c.drawLine(
          canvas_margin_left,
          width - canvas_margin_right,
          height - canvas_margin_bottom,
          height - canvas_margin_bottom,
          "border");
    }

    /** render left border **/
    if (params.border_left) {
      c.drawLine(
          canvas_margin_left,
          canvas_margin_left,
          canvas_margin_top,
          height - canvas_margin_bottom,
          "border");
    }
  }

  function drawXAxis(c) {
    c.svg += "<g class='axis x'>";

    /** render tick/grid **/
    var text_padding = 6 * RENDER_SCALE_FACTOR;
    for (var i = 1; i < x_ticks_count; i++) {
      var tick_x_domain = (i / x_ticks_count);
      var tick_x_screen = tick_x_domain * (width - (canvas_margin_left + canvas_margin_right)) + canvas_margin_left;

      c.drawLine(
          tick_x_screen,
          tick_x_screen,
          canvas_margin_top,
          height - canvas_margin_bottom,
          "grid");

      c.drawText(
          tick_x_screen,
          (height - canvas_margin_bottom) + text_padding,
          "2017-01-01");
    }

    c.svg += "</g>";
  }

   function drawYAxis(result, c) {
    c.svg += "<g class='axis y'>";

    /** render tick/grid **/
    for (var i = 0; i <= y_ticks_count ; i++) {
      var tick_y_domain = (i / y_ticks_count);
      var tick_y_screen = tick_y_domain * (height - (canvas_margin_bottom + canvas_margin_top)) + canvas_margin_top;

      c.drawLine(
          canvas_margin_left,
          width - canvas_margin_right,
          tick_y_screen,
          tick_y_screen,
          "grid");

      if (params.axis_y_position == "inside" && (i == y_ticks_count)) {
        /* skip text */
      } else if (params.axis_y_position == "inside") {
        var text_padding = 2 * RENDER_SCALE_FACTOR;
        c.drawText(
            canvas_margin_left + text_padding,
            tick_y_screen,
            y_labels[i],
            "inside");
      } else {
        var text_padding = 5 * RENDER_SCALE_FACTOR;
        c.drawText(
            canvas_margin_left - text_padding,
            tick_y_screen,
            y_labels[i],
            "outside");
      }
    }

    c.svg += "</g>";
   }

  function drawLine(series, c, opts) {
    var points = [];

    for (var i = 0; i < series.values.length; i++) {
      var x = x_domain.convertDomainToScreen(series.time[i]);
      var x_screen = x * (width - (canvas_margin_left + canvas_margin_right)) + canvas_margin_left;

      if (series.values[i] === null) {
        points.push([x_screen, null]);
      } else {
        var y = y_domain.convertDomainToScreen(series.values[i]);
        var y_screen = (1.0 - y) * (height - (canvas_margin_bottom + canvas_margin_top)) + canvas_margin_top;
        points.push([x_screen, y_screen]);
      }
    }

    c.drawPath(points, "line", { stroke: opts.color });
  }

  function drawPoints(series, c) {
    var point_size = 3;

    for (var i = 0; i < series.values.length; i++) {
      var x = x_domain.convertDomainToScreen(series.time[i]);
      var y = y_domain.convertDomainToScreen(series.values[i]);

      var x_screen = x * (width - (canvas_margin_left + canvas_margin_right)) + canvas_margin_left;
      var y_screen = height - (y * (height - (canvas_margin_bottom + canvas_margin_top)) + canvas_margin_bottom);

      c.drawPoint(x_screen, y_screen, point_size, "point");
    }
  }

}


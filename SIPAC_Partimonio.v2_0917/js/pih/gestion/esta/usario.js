$(function() {
    //Entidad
    var w = 300, //width
        h = 300, //height
        r = 100; //radius

 
    color = d3.scale.ordinal().range(["#5B9BD5", "#ED7D31", "#A5A5A5", "#FFC000", "#4472C4"]);
    var data = new Array();
    var usarioCntGraph1Data;
    var usarioCntGraph1 = $("#usarioCntGraph1").val();
    var usarioCntGraph1Str = usarioCntGraph1.split(",").slice(0, 5);
    $(usarioCntGraph1Str).each(function(rowIdx, rowVal) {
        arrVal = rowVal.split(':');
        if (arrVal[1] == 0) return;

        var rowHtml = [];
        rowHtml.push('<tr>');
        rowHtml.push('<td><span class="g_labelColor graphC' + (rowIdx + 1) + '"></span></td>');
        rowHtml.push('<td class="entidad' + rowIdx + '">' + arrVal[0] + '(' + arrVal[1] + ')</td>');
        rowHtml.push('</tr>');

        $('#entidadLabelWrap').append(rowHtml.join(''));

        data.push({
            'label': (arrVal[1] / $('#totalCnt').data('totalCnt') * 100).toFixed(1),
            'value': (arrVal[1] / $('#totalCnt').data('totalCnt') * 100)
        });
    });
 
    var vis = d3.select(".entidad")
        .append("svg:svg") //create the SVG element inside the <body>
        .data([data]) //associate our data with the document
        .attr("width", w) //set the width and height of our visualization (these will be attributes of the <svg> tag
        .attr("height", h)
        .append("svg:g") //make a group to hold our pie chart
        .attr("transform", "translate(" + r + "," + r + ")") //move the center of the pie chart from 0, 0 to radius, radius

    var arc = d3.svg.arc() //this will create <path> elements for us using arc data
        .outerRadius(r);

    var pie = d3.layout.pie() //this will create arc data for us given a list of values
        .value(function(d) {
            return d.value;
        }); //we must tell it out to access the value of each element in our data array

    var arcs = vis.selectAll("g.slice") //this selects all <g> elements with class slice (there aren't any yet)
        .data(pie) //associate the generated pie data (an array of arcs, each having startAngle, endAngle and value properties)
        .enter() //this will create <g> elements for every "extra" data element that should be associated with a selection. The result is creating a <g> for every object in the data array
        .append("svg:g") //create a group to hold each slice (we will have a <path> and a <text> element associated with each slice)
        .attr("class", "slice"); //allow us to style things in the slices (like text)

    arcs.append("svg:path")
        .attr("fill", function(d, i) {
            return color(i);
        }) //set the color for each slice to be chosen from the color function defined above
        .attr("d", arc); //this creates the actual SVG path using the associated data (pie) with the arc drawing function

    arcs.append("svg:text") //add a label to each slice
        .attr("transform", function(d) { //set the label's origin to the center of the arc
            //we have to make sure to set these before calling arc.centroid
            d.innerRadius = 0;
            d.outerRadius = r;
            return "translate(" + arc.centroid(d) + ")"; //this gives us a pair of coordinates like [50, 50]
        })
        .attr("text-anchor", "middle") //center the text on it's origin
        .text(function(d, i) {
            return data[i].label;
        }); //get the label from our original data array



    //DDC
    var w = 300, //width
        h = 300, //height
        r = 100; //radius

 
    color = d3.scale.ordinal().range(["#5B9BD5", "#ED7D31", "#A5A5A5", "#FFC000", "#4472C4"]);
    var data = new Array();
    var usarioCntGraph1Data;
    var usarioCntGraph2 = $("#usarioCntGraph2").val();
    var usarioCntGraph2Str = usarioCntGraph2.split(",").slice(0, 5);
    var usarioCntGraph2ActStr = usarioCntGraph2.split(",").slice(5);
    (function() {
        var usarioCntGraph2ActSum = 0;
        $(usarioCntGraph2ActStr).each(function(rowIdx, rowVal) {
            arrVal = rowVal.split(':');
            usarioCntGraph2ActSum += parseInt(arrVal[1], 10);
        });
        usarioCntGraph2Str.push('ACT:' + usarioCntGraph2ActSum);
    })();
    $(usarioCntGraph2Str).each(function(rowIdx, rowVal) {
        arrVal = rowVal.split(':');
        if (arrVal[1] == 0) return;

        var rowHtml = [];
        rowHtml.push('<tr>');
        rowHtml.push('<td><span class="g_labelColor graphC' + (rowIdx + 1) + '"></span></td>');
        rowHtml.push('<td class="ddc' + rowIdx + '">' + arrVal[0] + '(' + arrVal[1] + ')</td>');
        rowHtml.push('</tr>');

        $('#ddcLabelWrap').append(rowHtml.join(''));

        data.push({
            'label': (arrVal[1] / $('#totalCnt').data('totalCnt') * 100).toFixed(1),
            'value': (arrVal[1] / $('#totalCnt').data('totalCnt') * 100)
        });
    });
 
    var vis = d3.select(".ddc")
        .append("svg:svg") //create the SVG element inside the <body>
        .data([data]) //associate our data with the document
        .attr("width", w) //set the width and height of our visualization (these will be attributes of the <svg> tag
        .attr("height", h)
        .append("svg:g") //make a group to hold our pie chart
        .attr("transform", "translate(" + r + "," + r + ")") //move the center of the pie chart from 0, 0 to radius, radius

    var arc = d3.svg.arc() //this will create <path> elements for us using arc data
        .outerRadius(r);

    var pie = d3.layout.pie() //this will create arc data for us given a list of values
        .value(function(d) {
            return d.value;
        }); //we must tell it out to access the value of each element in our data array

    var arcs = vis.selectAll("g.slice") //this selects all <g> elements with class slice (there aren't any yet)
        .data(pie) //associate the generated pie data (an array of arcs, each having startAngle, endAngle and value properties)
        .enter() //this will create <g> elements for every "extra" data element that should be associated with a selection. The result is creating a <g> for every object in the data array
        .append("svg:g") //create a group to hold each slice (we will have a <path> and a <text> element associated with each slice)
        .attr("class", "slice"); //allow us to style things in the slices (like text)

    arcs.append("svg:path")
        .attr("fill", function(d, i) {
            return color(i);
        }) //set the color for each slice to be chosen from the color function defined above
        .attr("d", arc); //this creates the actual SVG path using the associated data (pie) with the arc drawing function

    arcs.append("svg:text") //add a label to each slice
        .attr("transform", function(d) { //set the label's origin to the center of the arc
            //we have to make sure to set these before calling arc.centroid
            d.innerRadius = 0;
            d.outerRadius = r;
            return "translate(" + arc.centroid(d) + ")"; //this gives us a pair of coordinates like [50, 50]
        })
        .attr("text-anchor", "middle") //center the text on it's origin
        .text(function(d, i) {
            return data[i].label;
        }); //get the label from our original data array




    //Museo
    var w = 300, //width
        h = 300, //height
        r = 100; //radius

 
    color = d3.scale.ordinal().range(["#5B9BD5", "#ED7D31", "#A5A5A5", "#FFC000", "#4472C4"]);
    var data = new Array();
    var usarioCntGraph3Data;
    var usarioCntGraph3 = $("#usarioCntGraph3").val();
    var usarioCntGraph3Str = usarioCntGraph3.split(",").slice(0, 5);
    var usarioCntGraph3ActStr = usarioCntGraph3.split(",").slice(5);
    (function() {
        var usarioCntGraph3ActSum = 0;
        $(usarioCntGraph3ActStr).each(function(rowIdx, rowVal) {
            arrVal = rowVal.split(':');
            usarioCntGraph3ActSum += parseInt(arrVal[1], 10);
        });
        usarioCntGraph3Str.push('ACT:' + usarioCntGraph3ActSum);
    })();
    $(usarioCntGraph3Str).each(function(rowIdx, rowVal) {
        arrVal = rowVal.split(':');
        if (arrVal[1] == 0) return;

        var rowHtml = [];
        rowHtml.push('<tr>');
        rowHtml.push('<td><span class="g_labelColor graphC' + (rowIdx + 1) + '"></span></td>');
        rowHtml.push('<td class="museo' + rowIdx + '">' + arrVal[0] + '(' + arrVal[1] + ')</td>');
        rowHtml.push('</tr>');

        $('#museoLabelWrap').append(rowHtml.join(''));

        data.push({
            'label': (arrVal[1] / $('#totalCnt').data('totalCnt') * 100).toFixed(1),
            'value': (arrVal[1] / $('#totalCnt').data('totalCnt') * 100)
        });
    });
 
    var vis = d3.select(".museo")
        .append("svg:svg") //create the SVG element inside the <body>
        .data([data]) //associate our data with the document
        .attr("width", w) //set the width and height of our visualization (these will be attributes of the <svg> tag
        .attr("height", h)
        .append("svg:g") //make a group to hold our pie chart
        .attr("transform", "translate(" + r + "," + r + ")") //move the center of the pie chart from 0, 0 to radius, radius

    var arc = d3.svg.arc() //this will create <path> elements for us using arc data
        .outerRadius(r);

    var pie = d3.layout.pie() //this will create arc data for us given a list of values
        .value(function(d) {
            return d.value;
        }); //we must tell it out to access the value of each element in our data array

    var arcs = vis.selectAll("g.slice") //this selects all <g> elements with class slice (there aren't any yet)
        .data(pie) //associate the generated pie data (an array of arcs, each having startAngle, endAngle and value properties)
        .enter() //this will create <g> elements for every "extra" data element that should be associated with a selection. The result is creating a <g> for every object in the data array
        .append("svg:g") //create a group to hold each slice (we will have a <path> and a <text> element associated with each slice)
        .attr("class", "slice"); //allow us to style things in the slices (like text)

    arcs.append("svg:path")
        .attr("fill", function(d, i) {
            return color(i);
        }) //set the color for each slice to be chosen from the color function defined above
        .attr("d", arc); //this creates the actual SVG path using the associated data (pie) with the arc drawing function

    arcs.append("svg:text") //add a label to each slice
        .attr("transform", function(d) { //set the label's origin to the center of the arc
            //we have to make sure to set these before calling arc.centroid
            d.innerRadius = 0;
            d.outerRadius = r;
            return "translate(" + arc.centroid(d) + ")"; //this gives us a pair of coordinates like [50, 50]
        })
        .attr("text-anchor", "middle") //center the text on it's origin
        .text(function(d, i) {
            return data[i].label;
        }); //get the label from our original data array


    /**
     * -- Entidad --  
     */
    $('#orgaSeq').on('change', function() {
        Code.orgaInfoCodeList($(this).val(), '2', 'Y', function(result) {
            var _html = '<option value=\"\" >-- DDC --</option>';
            result.forEach(function(v, i) {
                _html += '<option value=\"' + v.orgaSeq + '\">' + v.orgaNm + '</option>';
            });
            $('#officeSeq').html(_html);
        });
    });

 
    if ($('#detailOfficeSeq').val() != '' && $('#detailOfficeSeq').val() != null) {
        Code.orgaInfoCodeList($('#orgaSeq').val(), '2', 'Y', function(result) {
            var _html = '<option value=\"\" >-- DDC --</option>';
            result.forEach(function(v, i) {
                if ($('#detailOfficeSeq').val() == v.orgaSeq) {
                    _html += '<option value=\"' + v.orgaSeq + '\" selected>' + v.orgaNm + '</option>';
                } else {
                    _html += '<option value=\"' + v.orgaSeq + '\">' + v.orgaNm + '</option>';
                }
            });
            $('#officeSeq').html(_html);
        });
    }

    /**
     * -- Museo --  
     */
    $('#officeSeq').on('change', function() {
        Code.orgaInfoCodeList($(this).val(), '3', 'Y', function(result) {
            var _html = '<option value=\"\" >-- Museo --</option>';
            result.forEach(function(v, i) {
                _html += '<option value=\"' + v.orgaSeq + '\">' + v.orgaNm + '</option>';
            });
            $('#museumSeq').html(_html);
        });
    });

 
    if ($('#detailMuseumSeq').val() != '' && $('#detailMuseumSeq').val() != null) {
        Code.orgaInfoCodeList($('#officeSeq').val(), '3', 'Y', function(result) {
            var _html = '<option value=\"\" >-- DDC --</option>';
            result.forEach(function(v, i) {
                if ($('#detailMuseumSeq').val() == v.orgaSeq) {
                    _html += '<option value=\"' + v.orgaSeq + '\" selected>' + v.orgaNm + '</option>';
                } else {
                    _html += '<option value=\"' + v.orgaSeq + '\">' + v.orgaNm + '</option>';
                }
            });
            $('#museumSeq').html(_html);
        });
    }


 
    $('.searchBtn').on('click', function() {
        $('#SRCH_FORM').attr('')
        $('#SRCH_FORM').attr('action', '/pih/pihEstadistica/usuario.do');
        $('[name=SRCH_FORM]').submit();
    });

 
    $('.resetBtn').on('click', function() {
        $('.reset').val('');
        $('#officeSeq').html('<option value=\"\" >-- DDC --</option>');
        $('#museumSeq').html('<option value=\"\" >-- Museo --</option>');
        $('input[name="userPrvtYn"]').val(['']);
        $('input[name="periodType"]').val(['day']);
        
        $("input[name='startDate'], input[name='startDateMonth'], input[name='startDateYear'], input[name='startDateYearOnly'], input[name='endDate'], input[name='endDateMonth'], input[name='endDateYear'], input[name='endDateYearOnly']").val("");
        chgSrchDate("1");
    });

 
    $('.excelDownload').on('click', function() {
        var strCols = 'Entidad,DDC,Museo,Apellidos y Nombres,Usuario,Borrador,Ingresado,Observado,TOTAL';
        $('#strCols').val(strCols);
        $('#SRCH_FORM').attr('action', '/pih/pihEstadistica/usarioExcelList.do');
        $('#SRCH_FORM').submit();
    });
});

$(document).ready(function(){
	$("input[name='startDate'], input[name='startDateMonth'], input[name='startDateYear'], input[name='startDateYearOnly'], input[name='endDate'], input[name='endDateMonth'], input[name='endDateYear'], input[name='endDateYearOnly']").val("");
	var chkVal = $('input[name="periodType"]:checked').val();
	if(chkVal == "day"){
		$("#dayStartDate").removeClass('hide');
		$("#dayEndDate").removeClass('hide');
		
		$("#monthStartDate").addClass('hide');
		$("#monthEndDate").addClass('hide');
		$("#yearStartDate").addClass('hide');
		$("#yearEndDate").addClass('hide');
	}else if(chkVal == "month"){
		$("#dayStartDate").addClass('hide');
		$("#dayEndDate").addClass('hide');
		
		$("#monthStartDate").removeClass('hide');
		$("#monthEndDate").removeClass('hide');
		$("#yearStartDate").addClass('hide');
		$("#yearEndDate").addClass('hide');
	}else if(chkVal == "year"){
		$("#dayStartDate").addClass('hide');
		$("#dayEndDate").addClass('hide');
		
		$("#monthStartDate").addClass('hide');
		$("#monthEndDate").addClass('hide');
		$("#yearStartDate").removeClass('hide');
		$("#yearEndDate").removeClass('hide');
	}
});

function chgSrchDate(md){
	$("input[name='startDate'], input[name='startDateMonth'], input[name='startDateYear'], input[name='startDateYearOnly'], input[name='endDate'], input[name='endDateMonth'], input[name='endDateYear'], input[name='endDateYearOnly']").val("");
	if(md == "1"){
		$("#dayStartDate").removeClass('hide');
		$("#dayEndDate").removeClass('hide');
		
		$("#monthStartDate").addClass('hide');
		$("#monthEndDate").addClass('hide');
		$("#yearStartDate").addClass('hide');
		$("#yearEndDate").addClass('hide');
	}else if(md == "2"){
		$("#dayStartDate").addClass('hide');
		$("#dayEndDate").addClass('hide');
		
		$("#monthStartDate").removeClass('hide');
		$("#monthEndDate").removeClass('hide');
		$("#yearStartDate").addClass('hide');
		$("#yearEndDate").addClass('hide');
	}else if(md == "3"){
		$("#dayStartDate").addClass('hide');
		$("#dayEndDate").addClass('hide');
		
		$("#monthStartDate").addClass('hide');
		$("#monthEndDate").addClass('hide');
		$("#yearStartDate").removeClass('hide');
		$("#yearEndDate").removeClass('hide');
	}
}
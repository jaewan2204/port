$(function() {
    //Tipo de Bien
	var w = 300, //width
    h = 300, //height
    r = 100; //radius

 
	color = d3.scale.ordinal().range(["#5B9BD5", "#ED7D31", "#A5A5A5", "#FFC000", "#4472C4"]);
	var data = new Array();
	var tipoBienGraph1Data;
	var tipoBienCntGraph1 = $("#tipoBienGraph1").val();
	var tipoBienCntGraph1Str = tipoBienCntGraph1.split(",").slice(0, 5);
	
	$(tipoBienCntGraph1Str).each(function(rowIdx, rowVal) {
	    arrVal = rowVal.split(':');
	    if (arrVal[1] == 0) return;
	
	    var rowHtml = [];
	    rowHtml.push('<tr>');
	    rowHtml.push('<td><span class="g_labelColor graphC' + (rowIdx + 1) + '"></span></td>');
	    rowHtml.push('<td class="tipobien' + rowIdx + '">' + arrVal[0] + '(' + arrVal[1] + ')</td>');
	    rowHtml.push('</tr>');
	
	    $('#tpBienLabelWrap').append(rowHtml.join(''));
	
	    data.push({
	        'label': (arrVal[1] / $('#tipoBienAllCnt').val() * 100).toFixed(1),
	        'value': (arrVal[1] / $('#tipoBienAllCnt').val() * 100)
	    });
	});
 
	var vis = d3.select(".tpbien")
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

 
	if ($('#detailProvinceNm').val() != '' && $('#detailProvinceNm').val() != null) {
        var ubigeoNo = $('#detailProvinceNm').val().substring(0, 4);
        Code.ubigeoCodeList('3', 'Y', ubigeoNo, function(result) {
            var _html = '<option value=\"\" >-- Seleccione --</option>';
            result.forEach(function(v, i) {
                if ($('#detailDistrictNm').val() == v.ubigeoNo) {
                    _html += '<option value=\"' + v.ubigeoNo + '\" selected>' + v.districtNm + '</option>';
                } else {
                    _html += '<option value=\"' + v.ubigeoNo + '\">' + v.districtNm + '</option>';
                }
            });
            $('#districtNm').html(_html);
        });
    }

    /**
     * Departamento Change Event
     */
    $(document).on('change', '#deptNm', function() {
        var ubigeoNo = $(this).val().substring(0, 2);
        Code.ubigeoCodeList('2', 'Y', ubigeoNo, function(result) {
            var _html = '<option value=\"\" >-- Seleccione --</option>';
            result.forEach(function(v, i) {
                _html += '<option value=\"' + v.ubigeoNo + '\">' + v.provinceNm + '</option>';
            });
            $('#provinceNm').html(_html);
        });
    });

    /**
     * Provincia Change Event
     */
    $(document).on('change', '#provinceNm', function() {
        var ubigeoNo = $(this).val().substring(0, 4);
        Code.ubigeoCodeList('3', 'Y', ubigeoNo, function(result) {
            var _html = '<option value=\"\" >-- Seleccione --</option>';
            result.forEach(function(v, i) {
                _html += '<option value=\"' + v.ubigeoNo + '\">' + v.districtNm + '</option>';
            });
            $('#districtNm').html(_html);
        });
    });

 
    $('.searchBtn').on('click', function() {
        $('#SRCH_FORM').attr('action', '/pih/pihEstadistica/cultural.do');
        $('[name=SRCH_FORM]').submit();
    });

 
    $('.resetBtn').on('click', function() {
        $('.reset').val('');
        $('#culCondCd').val('PIH011002');
        $('#provinceNm').html('<option value=\"\" >-- Seleccione --</option>');
        $('#districtNm').html('<option value=\"\" >-- Seleccione --</option>');
        
        $("input[name='startDate'], input[name='startDateMonth'], input[name='startDateYear'], input[name='startDateYearOnly'], input[name='endDate'], input[name='endDateMonth'], input[name='endDateYear'], input[name='endDateYearOnly']").val("");
    });

 
    $('.excelDownload').on('click', function() {
        var strCols = 'Estado,Paleontológico,Prehispánico,Histórico-artístico,Etnográfico,Industrial,Histórico-artístico,Etnográfico,Industrial,Histórico-artístico,Etnográfico,Industrial,TOTAL';
        $('#strCols').val(strCols);
        $('#SRCH_FORM').attr('action', '/pih/pihEstadistica/culturalExcelList.do');
        $('#SRCH_FORM').submit();
    });

});

$(document).ready(function(){
	//$("input[name='startDate'], input[name='startDateMonth'], input[name='startDateYear'], input[name='startDateYearOnly'], input[name='endDate'], input[name='endDateMonth'], input[name='endDateYear'], input[name='endDateYearOnly']").val("");
});
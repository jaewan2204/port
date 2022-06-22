$(function() {
    //Condición cultural
    var w = 300, //width
        h = 300, //height
        r = 100; //radius
 
    color = d3.scale.ordinal().range(["#5B9BD5", "#ED7D31", "#A5A5A5", "#FFC000", "#4472C4"]);
    var data = new Array();
    var arr = new Array();
    $('.totalSum').each(function(i, v) {
        var totalCnt = parseInt($(this).data('totalCnt'), 10);
        if (totalCnt > 0) {
            arr.push({
                totalCnt: totalCnt,
                labelText: $(this).data('estadoType')
            });
        }
    });

 
    arr = arr.sort(function(a, b) {
        return b.totalCnt - a.totalCnt;
    }).slice(0, 5);

    $(arr).each(function(rowIdx, rowObj) {
        var rowHtml = [];
        rowHtml.push('<tr>');
        rowHtml.push('<td><span class="g_labelColor graphC' + (rowIdx + 1) + '"></span></td>');
        rowHtml.push('<td class="estado' + rowIdx + '">' + rowObj.labelText + '(' + rowObj.totalCnt + ')</td>');
        rowHtml.push('</tr>');

        $('#estadoLabelWrap').append(rowHtml.join(''));

        data.push({
            'label': (rowObj.totalCnt / $('#totalCnt').data('totalCnt') * 100).toFixed(1),
            'value': (rowObj.totalCnt / $('#totalCnt').data('totalCnt') * 100)
        });
    });
 

    var vis = d3.select(".estado")
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




 
    $(document).on('change', '[name=classCd]', function() {
        Code.stdCodeOrderList('Y', 'MVB', '005', $(this).val(), '2', '', 'ORDER BY STD_CD ASC', function(result) {
            var _html = '<option value=\"\" >-- Seleccione --</option>';
            result.forEach(function(v, i) {
                _html += '<option value=\"' + v.stdCd + '\">' + v.cdSpnNm + '</option>';
            });
            $('#classSpecCd').html(_html);
        });
    });


 
    $('.searchBtn').on('click', function() {
        $('#SRCH_FORM').attr('action', '/pm/pmEstadistica/cultural.do');
        $('[name=SRCH_FORM]').submit();
        $(".loadingWrap").show();
    });

    //ClassCd 
    if ($('[name=classCd]').val() != '' && $('[name=classCd]').val() != null) {
        Code.stdCodeOrderList('Y', 'MVB', '005', $('[name=classCd]').val(), '2', '', 'ORDER BY STD_CD ASC', function(result) {
            var _html = '<option value=\"\" >-- Seleccione --</option>';
            result.forEach(function(v, i) {
                if ($('#detailClassSpecCd').val() == v.stdCd) {
                    _html += '<option value=\"' + v.stdCd + '\" selected>' + v.cdSpnNm + '</option>';
                } else {
                    _html += '<option value=\"' + v.stdCd + '\">' + v.cdSpnNm + '</option>';
                }
            });
            $('#classSpecCd').html(_html);
        });
    }

 
    $('.resetBtn').on('click', function() {
        $('.reset').val('');
        $('#classSpecCd').html('<option value=\"\" >-- Seleccione --</option>');
        $('input[name="periodType"]').val(['day']);
        
        $("input[name='startDate'], input[name='startDateMonth'], input[name='startDateYear'], input[name='startDateYearOnly'], input[name='endDate'], input[name='endDateMonth'], input[name='endDateYear'], input[name='endDateYearOnly']").val("");
        chgSrchDate("1");
        
        $('#SRCH_FORM').attr('action', '/pm/pmEstadistica/cultural.do');
        $('[name=SRCH_FORM]').submit();
        $(".loadingWrap").show();
    });

 
    $('.excelDownload').on('click', function() {
        var strCols = 'Estado,Paleontológico,Prehispánico,Histórico-artístico,Etnográfico,Industrial,Histórico-artístico,Etnográfico,Industrial,Histórico-artístico,Etnográfico,Industrial,TOTAL';
        $('#strCols').val(strCols);
        $('#SRCH_FORM').attr('action', '/pm/pmEstadistica/culturalExcelList.do');
        $('#SRCH_FORM').submit();
    });

});

$(document).ready(function(){
	//$("input[name='startDate'], input[name='startDateMonth'], input[name='startDateYear'], input[name='startDateYearOnly'], input[name='endDate'], input[name='endDateMonth'], input[name='endDateYear'], input[name='endDateYearOnly']").val("");
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
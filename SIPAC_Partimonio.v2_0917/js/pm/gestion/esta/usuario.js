$(function() {
    //Entidad
    var w = 300, //width
        h = 300, //height
        r = 100; //radius

 
    color = d3.scale.ordinal().range(["#5B9BD5", "#ED7D31", "#A5A5A5", "#FFC000", "#4472C4"]);
    var data = new Array();

    var arr = new Array();
    $('.orgaSeq').each(function(i, v) {
        arr.push($(v).data('orgaSeq'));
    });

    Array.prototype.unique = function() {
        var a = {};
        for (var i = 0; i < this.length; i++) {
            if (typeof a[this[i]] == 'undefined') {
                a[this[i]] = 1;
            }
        }
        this.length = 0;
        for (var i in a) {
            this[this.length] = i;
        }
        return this;
    };

    var newArr = new Array();

    arr.unique().forEach(function(v, i) {
        var dataLength = 0;
        var orgaNm = '';
        $('.orgaSeq').each(function(ii, vv) {
            if (v == $(vv).data('orgaSeq')) {
                dataLength++;
                orgaNm = $(vv).data('orgaNm');
            }
        });
        newArr.push({
            name: orgaNm,
            size: dataLength
        });
    });

    newArr.sort(function(a, b) {
        return (a.size > b.size) ? -1 : (a.size < b.size) ? 1 : 0;
    });

    var orgaData;
    var totalSize = $('.orgaSeq').length;
    newArr.forEach(function(v, i) {
        var rowHtml = [];
        rowHtml.push('<tr>');
        rowHtml.push('<td><span class="g_labelColor graphC' + (i + 1) + '"></span></td>');
        rowHtml.push('<td class="entidad' + i + '">' + v.name + '</td>');
        rowHtml.push('</tr>');

        $('#entidadLabelWrap').append(rowHtml.join(''));

        orgaData = {
            'label': (v.size / totalSize * 100).toFixed(1),
            'value': (v.size / totalSize * 100)
        }
        data.push(orgaData);
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

    var arr = new Array();
    $('.officeSeq').each(function(i, v) {
        arr.push($(v).data('officeSeq'));
    });

    Array.prototype.unique = function() {
        var a = {};
        for (var i = 0; i < this.length; i++) {
            if (typeof a[this[i]] == 'undefined') {
                a[this[i]] = 1;
            }
        }
        this.length = 0;
        for (var i in a) {
            this[this.length] = i;
        }
        return this;
    };

    var newArr = new Array();

    arr.unique().forEach(function(v, i) {
        var dataLength = 0;
        var officeNm = '';
        $('.officeSeq').each(function(ii, vv) {
            if (v == $(vv).data('officeSeq')) {
                dataLength++;
                officeNm = $(vv).data('officeNm');
            }
        });
        newArr.push({
            name: officeNm,
            size: dataLength
        });
    });

    newArr.sort(function(a, b) {
        return (a.size > b.size) ? -1 : (a.size < b.size) ? 1 : 0;
    });

    var officeData;
    var totalSize = $('.officeSeq').length;
    newArr.forEach(function(v, i) {
        var rowHtml = [];
        rowHtml.push('<tr>');
        rowHtml.push('<td><span class="g_labelColor graphC' + (i + 1) + '"></span></td>');
        rowHtml.push('<td class="ddc' + i + '">' + v.name + '</td>');
        rowHtml.push('</tr>');

        $('#ddcLabelWrap').append(rowHtml.join(''));
        
        officeData = {
            'label': (v.size / totalSize * 100).toFixed(1),
            'value': (v.size / totalSize * 100)
        }
        data.push(officeData);
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

    var arr = new Array();
    $('.museumSeq').each(function(i, v) {
        arr.push($(v).data('museumSeq'));
    });

    Array.prototype.unique = function() {
        var a = {};
        for (var i = 0; i < this.length; i++) {
            if (typeof a[this[i]] == 'undefined') {
                a[this[i]] = 1;
            }
        }
        this.length = 0;
        for (var i in a) {
            this[this.length] = i;
        }
        return this;
    };

    var newArr = new Array();

    arr.unique().forEach(function(v, i) {
        var dataLength = 0;
        var museumNm = '';
        $('.museumSeq').each(function(ii, vv) {
            if (v == $(vv).data('museumSeq')) {
                dataLength++;
                museumNm = $(vv).data('museumNm');
            }
        });
        newArr.push({
            name: museumNm,
            size: dataLength
        });
    });

    newArr.sort(function(a, b) {
        return (a.size > b.size) ? -1 : (a.size < b.size) ? 1 : 0;
    });

    var museumData;
    var totalSize = $('.museumSeq').length;
    newArr.forEach(function(v, i) {
        var rowHtml = [];
        rowHtml.push('<tr>');
        rowHtml.push('<td><span class="g_labelColor graphC' + (i + 1) + '"></span></td>');
        rowHtml.push('<td class="museo' + i + '">' + v.name + '</td>');
        rowHtml.push('</tr>');

        $('#museoLabelWrap').append(rowHtml.join(''));

        museumData = {
            'label': (v.size / totalSize * 100).toFixed(1),
            'value': (v.size / totalSize * 100)
        }
        data.push(museumData);
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
     * -- Entidad 
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
    
    if ($('[name=orgaSeq]').val() != '' && $('[name=orgaSeq]').val() != null) {
    	Code.orgaInfoCodeList($('[name=orgaSeq]').val(), '2', 'Y', function(result) {
            var _html = '<option value=\"\" >-- DDC --</option>';
            result.forEach(function(v, i) {
                _html += '<option value=\"' + v.orgaSeq + '\">' + v.orgaNm + '</option>';
            });
            $('#officeSeq').html(_html);
        });
    	
    	
    	if ($('[name=officeSeq]').val() != '' && $('[name=officeSeq]').val() != null) {
    		Code.orgaInfoCodeList($('[name=officeSeq]').val(), '3', 'Y', function(result) {
                var _html = '<option value=\"\" >-- Museo --</option>';
                result.forEach(function(v, i) {
                    _html += '<option value=\"' + v.orgaSeq + '\">' + v.orgaNm + '</option>';
                });
                $('#museumSeq').html(_html);
            });
    	}
    }


 
    $('.searchBtn').on('click', function() {
        $('#SRCH_FORM').attr('')
        $('#SRCH_FORM').attr('action', '/pm/pmEstadistica/usuario.do');
        $('[name=SRCH_FORM]').submit();
        $(".loadingWrap").show();
    });

 
    $('.resetBtn').on('click', function() {
        $('.reset').val('');
        $('#officeSeq').html('<option value=\"\" >-- DDC --</option>');
        $('#museumSeq').html('<option value=\"\" >-- Museo --</option>');
        $('input[name="userPrvtYn"]').val(['']);
        $('input[name="periodType"]').val(['day']);
        
        $("input[name='startDate'], input[name='startDateMonth'], input[name='startDateYear'], input[name='startDateYearOnly'], input[name='endDate'], input[name='endDateMonth'], input[name='endDateYear'], input[name='endDateYearOnly']").val("");
        chgSrchDate("1");
        
        $('#SRCH_FORM').attr('action', '/pm/pmEstadistica/usuario.do');
        $('[name=SRCH_FORM]').submit();
        $(".loadingWrap").show();
    });

 
    $('.excelDownload').on('click', function() {
        var strCols = 'Entidad,DDC,Museo,Apellidos y Nombres,Usuario,Borrador,Ingresado,Modificado,Observado,Pre-Inscripción,Registrado preliminar,Registrado,Desbloqueado,Anulado,TOTAL';
        $('#strCols').val(strCols);
        $('#SRCH_FORM').attr('action', '/pm/pmEstadistica/usuarioExcelList.do');
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
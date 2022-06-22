// JavaScript Document

// Global use script
//--------------------------------------------/
$(document).ready(function(){
	
	"use strict";
	
	// input type text add Clear button		-	Global
	function clear_input() {
		// console.log('If input has value clear function');
		$(document).on('keyup paste', '.has-clear input', function() {
			console.log('dinamic function test');
			var $this = $(this);
			var $clearBtn = $this.siblings('.form-control-clear');
			if($this.val().length > 0) {
				$clearBtn.removeClass('hidden');
			} else {
				$clearBtn.addClass('hidden');
			}
		});
		$(document).on('click', '.form-control-clear', function() {
			$(this).siblings('input').val('');
			$(this).addClass('hidden');
		});
	} clear_input();
	
	// When slectAll checkbox check, all of checkbox checked	-	Global
	// $('.selectAll').click(function() {
	// 	var $parent = $(this).closest('.table-checkable'),
	// 		$checkbox = $parent.find('input:checkbox').not(':disabled');
    //
	// 	$checkbox.not(this).prop('checked', this.checked);
	// });
	
	// // Design Radio click trigger hidden input	-	Global
	// $(document).on('click', '.radio-style-2-label', function() {
	// 	// console.log('Design radio click history');
	// 	// $(this).siblings('input:radio').trigger('click');
	// });
	
	// image preview popup call		-	Global
	$('.view_trigger').magnificPopup({
		type: 'image',
		closeOnContentClick: true,
		closeBtnInside: false,
		fixedContentPos: true,
		image: {
			verticalFit: true
		}
	});
	
	// checkbox event	-	Global
	$(document).on('click', '.checkable', function () {
		var $checkbox = $(this).find('input:checkbox'),
			$label_icon = $(this).find('i');

		$checkbox.trigger('click');

		$checkbox.on('change', function() {
			if ($(this).is(':checked')) {
				$label_icon.removeClass('xi-check-square-o');
				$label_icon.addClass('xi-check-square color-primary');
			} else {
				$label_icon.removeClass('xi-check-square color-primary');
				$label_icon.addClass('xi-check-square-o');
			}
		});
	});
	
	// // Marking image	-	Global
	// $(document).on('click', '.portfolio-item .markable', function () {
	// 	var $wrapper = $(this).closest('.input_fields_wrap'),
	// 		$checkbox = $(this).find('input:checkbox'),
	// 		$label_icon = $(this).find('i'),
	// 		$marked_box = $(this).closest('.overlay-buttons-group').siblings('.portfolio-image'),
	// 		$all_checkbox = $wrapper.find('.marked'),
	// 		$all_label_icon = $wrapper.find('.marked_icon'),
	// 		$all_marked_box = $wrapper.find('.portfolio-image');
    //
    //
	// 	$checkbox.trigger('click');
	// 	$checkbox.on('change', function() {
	// 		if ($(this).is(':checked')) {
	// 			$all_checkbox.not($checkbox).prop('checked', false);
	// 			$all_label_icon.removeClass('xi-radiobox-checked color-primary xi-radiobox-blank');
	// 			$all_marked_box.removeClass('marked_box');
	// 			$all_label_icon.addClass('xi-radiobox-blank');
	// 			$label_icon.addClass('xi-radiobox-checked color-primary');
	// 			$marked_box.addClass('marked_box');
	// 		} else {
	// 			$all_checkbox.not($checkbox).prop('checked', false);
	// 			$all_label_icon.removeClass('xi-radiobox-checked color-primary xi-radiobox-blank');
	// 			$all_label_icon.addClass('xi-radiobox-blank');
	// 			$marked_box.removeClass('marked_box');
	// 		}
	// 	});
	// });
	
	// Select All & Unselect All	-	Global
	$(document).on('click', '.selectAllbtn, .unselectAllbtn', function() {
		var $parent = $(this).closest('.control-wrapper'),
			$global_checkbox = $parent.find('.checkable').find('input:checkbox'),
			$global_checkbox_in_table = $parent.find('.table-checkable').find('input:checkbox'),
			$global_label_icon = $parent.find('.checkable').find('i');

		if ($parent.find('.checkable').length !== 0) {	// image card ui type
			if ($(this).is('.selectAllbtn')) {
				$global_checkbox.prop('checked', true);
				$global_label_icon.removeClass('xi-check-square-o');
				$global_label_icon.addClass('xi-check-square color-primary');
			} else {
				$global_checkbox.prop('checked', false);
				$global_label_icon.removeClass('xi-check-square color-primary');
				$global_label_icon.addClass('xi-check-square-o');
			}
		}
		else {
			if ($(this).is('.selectAllbtn')) {
				$global_checkbox_in_table.prop('checked', true);
			} else {
				$global_checkbox_in_table.prop('checked', false);
			}
		}
	});
	
	/*
	// When table row click checkbox checked	-	Global
	function row_checkable() {
		$('body').on('click', '.table-checkable > tbody > tr > td', function() {			// dynamic row click
		//$('.table-checkable > tbody > tr > td').click(function() {
			var $parent = $(this).closest('tr'),
				$checkbox = $parent.find('input:checkbox');
			
			if ($(this).hasClass('select-except')) {
				console.log('click except column');
			} else {
				$checkbox.trigger('click');
				console.log('click check able column');
			}
		});

		// checkbox checked testor
		$('input:checkbox').change(function() {
			if ($(this).prop('checked')) {
				console.log('show checkout history.'); //checked
			}
			else {
				console.log('turn off checkout history.'); //not checked
			}
		});
	} row_checkable();
	*/
	// sticky object scroll		-	Global
	$(function() {
		var offset = $('.sticky_item').offset();
		var topPadding = 50;
		
		if ($('body').find('.sticky_item').length !==  0) {
			$(window).scroll(function() {
				if ($(window).scrollTop() > offset.top) {
					$('.sticky_item').stop().animate({
						marginTop: $(window).scrollTop() - offset.top + topPadding
					});
				} else {
					$('.sticky_item').stop().animate({
						marginTop: 0
					});
				}
			});
		}
	});
	
	// tooltip open		-	Global
	$(function () {
		$('[data-toggle="tooltip"]').tooltip({
			container: 'body'
		});
	});
	
	
	// Datepicker	- Global
	function datepicker() {
		$('#S_date, #E_date, #S_date_second, #E_date_second, #S_date_third, #E_date_third').datetimepicker({
			dayViewHeaderFormat: 'YYYY MM',
			format: 'YYYY.MM.DD',
			useCurrent: false
		});
		
		$('.sdate, .edate').click(function(){
			$(this).siblings('input:text').trigger('select');
		});
		
		//	S date link E date
		$("#S_date").on("dp.change", function (e) {
			$('#E_date').data("DateTimePicker").minDate(e.date);
		});
		$("#E_date").on("dp.change", function (e) {
			$('#S_date').data("DateTimePicker").maxDate(e.date);
		});
		
		// S date second link E date second
		$("#S_date_second").on("dp.change", function (e) {
			$('#E_date_second').data("DateTimePicker").minDate(e.date);
		});
		$("#E_date_second").on("dp.change", function (e) {
			$('#S_date_second').data("DateTimePicker").maxDate(e.date);
		});
		
		// S date second link E date second
		$("#S_date_third").on("dp.change", function (e) {
			$('#E_date_third').data("DateTimePicker").minDate(e.date);
		});
		$("#E_date_third").on("dp.change", function (e) {
			$('#S_date_third').data("DateTimePicker").maxDate(e.date);
		});
	} datepicker();
});


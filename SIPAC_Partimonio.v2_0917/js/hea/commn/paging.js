
function paging(targetId, totalCnt, dataSize, pageSize, maxPaginationSize, curPage, token){ 
	
	if(curPage == 0) curPage = 1;
	
	totalCnt = parseInt(totalCnt);		// Total Record Count 
	dataSize = parseInt(dataSize); 		// Data Row Count per Page 
	pageSize = parseInt(pageSize); 		// Page Col Count per Page 1|2|3|... 
	curPage = parseInt(curPage); 	
	
	prePage = curPage -1;
	nextPage = curPage +1;
	
	var html = ""; 
	if(totalCnt == 0){ return ""; } 
	
	// pageCount
	var pageCnt = totalCnt % dataSize; 
	if(pageCnt == 0){ 
		pageCnt = parseInt(totalCnt / dataSize); 
	}else{ 
		pageCnt = parseInt(totalCnt / dataSize) + 1; 
	} 
	
	var pRCnt = parseInt(curPage / pageSize); 
	if(curPage % pageSize == 0){ 
		pRCnt = parseInt(curPage / pageSize) - 1; 
	} 
	
    if(prePage <= 1) prePage = 1;
    if(nextPage >= pageCnt) nextPage = pageCnt;
    
    // Prev Button
	html += "<a class='direction l2' href='javascript:" + token + "(" + 1 + ");'></a>";
	html += "<a class='direction l1' href='javascript:" + token + "(" + prePage + ");'></a>";
	
	//paging Bar 
	for(var index=pRCnt * pageSize + 1;index<(pRCnt + 1)*pageSize + 1;index++){ 
		if(index == curPage){ 
			html += "<a class='active' href='javascript:void(0);'>"+index+"</a>";
		}else{ 
			html += "<a href='javascript:" + token + "(" + index + ");'>"+index+"</a>";
		} 
		
		if(index == pageCnt){ 
			break; 
		}
	} 
	
	//Next Button
	html += "<a class='direction r1' href='javascript:" + token + "(" + nextPage + ");'></a>";
	html += "<a class='direction r2' href='javascript:" + token + "(" + maxPaginationSize + ");'></a>";
	
	$("#"+targetId).empty().html(html);
	
	var totalInfo = "Total "+totalCnt+" ("+curPage+" / "+maxPaginationSize+" Page)";
	return totalInfo;
}




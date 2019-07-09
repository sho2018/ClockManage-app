/**
 * 日付フォーマット
 * 引数：Date：対象日付
 * 戻り値：String：yyyy/MM/dd
 */
function dateFormat(date) {
	//日付オブジェクトを作成する
	var targetDate = new Date(date);
	//「年」を取得する
	var yyyy = targetDate.getFullYear();
	//「月」を取得する
	var mm = targetDate.getMonth()+1;
	//「日」を取得する
	var dd = targetDate.getDate();
	// 日付返却
	return yyyy + "/" + mm + "/" + dd;
};
<?php

	$name      = htmlspecialchars($_POST["name"]); 
	$phone       = htmlspecialchars($_POST["phone"]);
	$email   = htmlspecialchars($_POST["email"]);
	$message  = htmlspecialchars($_POST["message"]);

	$json = array(); // подготовим массив ответа

/*	if (!$allinfoname or !$allinfocity or !$responsiblename or !$responsiblephone or !$responsibleemail) { // если хоть одно поле оказалось пустым
		$json['error'] = 'Вы заполнили не все поля!'; // пишем ошибку в массив
		echo json_encode($json); // выводим массив ответа 
		die(); // умираем
	}*/

	function mime_header_encode($str, $data_charset, $send_charset) { // функция преобразования заголовков в верную кодировку 
		if($data_charset != $send_charset)
		$str=iconv($data_charset,$send_charset.'//IGNORE',$str);
		return ('=?'.$send_charset.'?B?'.base64_encode($str).'?=');
	}

	/* супер класс для отправки письма в нужной кодировке */
	class TEmail {
	public $addattachment;
	public $from_email;
	public $from_name;
	public $to_email;
	public $to_name;
	public $subject='';
	public $data_charset='UTF-8';
	public $send_charset='windows-1251';
	public $body='';
	public $type='text/html';

		function send(){
			$dc=$this->data_charset;
			$sc=$this->send_charset;
			$enc_to=mime_header_encode($this->to_name,$dc,$sc).' <'.$this->to_email.'>';
			$enc_subject=mime_header_encode($this->subject,$dc,$sc);
			$enc_from=mime_header_encode($this->from_name,$dc,$sc).' <'.$this->from_email.'>';
			$enc_body=$dc==$sc?$this->body:iconv($dc,$sc.'//IGNORE',$this->body);
			$headers='';
			$headers.="Mime-Version: 1.0\r\n";
			$headers.="Content-type: text/html; charset=".$sc."\r\n";
				
			//$headers.="From: ".$enc_from."\r\n";
			return mail($enc_to,$enc_subject,$enc_body,$headers);
		}

	}

	$emailgo= new TEmail; // инициализируем супер класс отправки
	$emailgo->from_email= $email; // от кого
	$emailgo->from_name= 'Заявка на консультацию';
	$emailgo->to_email= 'sidorqq@gmail.com'; // кому
	$emailgo->to_name= $name;
	$emailgo->subject= 'Заявка на консультацию'; // тема
	$emailgo->body = "Имя: $name, телефон: $phone, КОНСУЛЬТАЦИЯ";

	$emailgo->send(); // отправляем

	$json['error'] = 0; // ошибок не было

	echo json_encode($json); // выводим массив ответа


?>
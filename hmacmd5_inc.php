<?php
	function hex_hmac_md5 ($key, $data)
	{
	   // RFC 2104 HMAC implementation for php.
	   // Creates an md5 HMAC.
	   // Eliminates the need to install mhash to compute a HMAC
	   // Hacked by Lance Rushing

	   $b = 64; // byte length for md5
	   if (strlen($key) > $b)
	   {
	       $key = pack("H*",md5($key));
	   }
	   $key  = str_pad($key, $b, chr(0x00));
	   $ipad = str_pad('', $b, chr(0x36));
	   $opad = str_pad('', $b, chr(0x5c));
	   $k_ipad = $key ^ $ipad ;
	   $k_opad = $key ^ $opad;

	   return md5($k_opad  . pack("H*",md5($k_ipad . $data)));
	}

	$MID = $argv[1];
	$TID = $argv[2];
	$Seed = $argv[3];
	$Amt = $argv[4];

	$Signature = hex_hmac_md5("1740468207174046820717404682071740468207", $MID . ':' . $TID . ':' . $Seed . ':' . $Amt);

	echo $Signature //. " MID: " . $MID . " TID: " . $TID . " Seed: " . $Seed . " Amount: " . $Amt;
?>
/*
	Hyperspace by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	var	$window = $(window),
		$body = $('body'),
		$sidebar = $('#sidebar');

	// Breakpoints.
		breakpoints({
			xlarge:   [ '1281px',  '1680px' ],
			large:    [ '981px',   '1280px' ],
			medium:   [ '737px',   '980px'  ],
			small:    [ '481px',   '736px'  ],
			xsmall:   [ null,      '480px'  ]
		});

	// Hack: Enable IE flexbox workarounds.
		if (browser.name == 'ie')
			$body.addClass('is-ie');

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Forms.

		// Hack: Activate non-input submits.
			$('form').on('click', '.submit', function(event) {

				// Stop propagation, default.
					event.stopPropagation();
					event.preventDefault();

				// Submit form.
					$(this).parents('form').submit();

			});

	// Sidebar.
		if ($sidebar.length > 0) {

			var $sidebar_a = $sidebar.find('a');

			$sidebar_a
				.addClass('scrolly')
				.on('click', function() {

					var $this = $(this);

					// External link? Bail.
						if ($this.attr('href').charAt(0) != '#')
							return;

					// Deactivate all links.
						$sidebar_a.removeClass('active');

					// Activate link *and* lock it (so Scrollex doesn't try to activate other links as we're scrolling to this one's section).
						$this
							.addClass('active')
							.addClass('active-locked');

				})
				.each(function() {

					var	$this = $(this),
						id = $this.attr('href'),
						$section = $(id);

					// No section for this link? Bail.
						if ($section.length < 1)
							return;

					// Scrollex.
						$section.scrollex({
							mode: 'middle',
							top: '-20vh',
							bottom: '-20vh',
							initialize: function() {

								// Deactivate section.
									$section.addClass('inactive');

							},
							enter: function() {

								// Activate section.
									$section.removeClass('inactive');

								// No locked links? Deactivate all links and activate this section's one.
									if ($sidebar_a.filter('.active-locked').length == 0) {

										$sidebar_a.removeClass('active');
										$this.addClass('active');

									}

								// Otherwise, if this section's link is the one that's locked, unlock it.
									else if ($this.hasClass('active-locked'))
										$this.removeClass('active-locked');

							}
						});

				});

		}

	// Scrolly.
		$('.scrolly').scrolly({
			speed: 1000,
			offset: function() {

				// If <=large, >small, and sidebar is present, use its height as the offset.
					if (breakpoints.active('<=large')
					&&	!breakpoints.active('<=small')
					&&	$sidebar.length > 0)
						return $sidebar.height();

				return 0;

			}
		});

	// Spotlights.
		$('.spotlights > section')
			.scrollex({
				mode: 'middle',
				top: '-10vh',
				bottom: '-10vh',
				initialize: function() {

					// Deactivate section.
						$(this).addClass('inactive');

				},
				enter: function() {

					// Activate section.
						$(this).removeClass('inactive');

				}
			})
			.each(function() {

				var	$this = $(this),
					$image = $this.find('.image'),
					$img = $image.find('img'),
					x;

				// Assign image.
					$image.css('background-image', 'url(' + $img.attr('src') + ')');

				// Set background position.
					if (x = $img.data('position'))
						$image.css('background-position', x);

				// Hide <img>.
					$img.hide();

			});

	// Features.
		$('.features')
			.scrollex({
				mode: 'middle',
				top: '-20vh',
				bottom: '-20vh',
				initialize: function() {

					// Deactivate section.
						$(this).addClass('inactive');

				},
				enter: function() {

					// Activate section.
						$(this).removeClass('inactive');

				}
			});

			//Localisation
			$( ".languageOptions" ).change(function() {
				    // var currLanguage = document.getElementById("language").value;
						var currLanguage = $('#language')[0].value;

						switch (currLanguage) {
				      case 'en':
									$('#subtitle')[0].innerHTML = "Share your accounts without giving your passwords away!";
									$('#sharingTitle')[0].innerHTML = "Share Steps";
									$('#receiveTitle')[0].innerHTML = "Receive Steps";
									$('#sharingSteps')[0].innerHTML = "1. Sign in to an account you want to share <br><br> 2. Click on a friend or type in a new username <br><br> 3. Choose a duration from 4h, 1d, 7d or 2w <br><br> 4. Click SharePass!"
									$('#receiveSteps')[0].innerHTML = "1. Click on the tick to accept an account <br><br> 2. Click the account to Sign In!";
				          break;

							case 'bd':
									$('#subtitle')[0].innerHTML = "আপনার পাসওয়ার্ড ছাড়াই অ্যাকাউন্টগুলি ভাগ করুন!";
									$('#sharingTitle')[0].innerHTML = "ভাগ করার নির্দেশাবলী";
									$('#receiveTitle')[0].innerHTML = "নির্দেশনা গ্রহণ করুন";
									$('#sharingSteps')[0].innerHTML = "1. ভাগ করতে একটি অ্যাকাউন্টে সাইন ইন করুন <br/>2. কোনও বন্ধু নির্বাচন করুন বা তাদের আইডি টাইপ করুন <br/>3. একটি সময়কাল চয়ন করুন: 4h, 1d, 7d বা 2w <br>4. ক্লিক করুন 'S' শেয়ার করার জন্য!"
									$('#receiveSteps')[0].innerHTML = "1. অ্যাকাউন্টটি গ্রহণ করতে টিক ক্লিক করুন <br/>2. সাইন ইন করতে অ্যাকাউন্টে ক্লিক করুন!";
				          break;

							case 'nl':
									$('#subtitle')[0].innerHTML = "Deel uw accounts zonder uw wachtwoorden weg te geven!";
									$('#sharingTitle')[0].innerHTML = "Deel Instructies";
									$('#receiveTitle')[0].innerHTML = "Ontvang Instructies";
									$('#sharingSteps')[0].innerHTML = "1. Meld u aan bij een account dat u wilt delen <br><br/>2. Klik op een vriend of schrijf hun ID hierboven <br><br/>3. Kies een duur: 4h, 1d, 7d of 2w <br><br>4. Klik op de gele 'S' om SharePass!"
									$('#receiveSteps')[0].innerHTML = "1. Klik op het vinkje om het account te accepteren<br><br/>2. Klik op het account om in te loggen!";
				          break;

							case 'es':
									$('#subtitle')[0].innerHTML = "¡Comparte tus cuentas sin revelar tus contraseñas!";
									$('#sharingTitle')[0].innerHTML = "Compartir instrucciones";
									$('#receiveTitle')[0].innerHTML = "Recibir instrucciones";
									$('#sharingSteps')[0].innerHTML = "1. Inicie sesión en una cuenta que desea compartir <br/>2. Haga clic en un amigo o escriba su ID arriba <br/>3. Elige una duración: 4h, 1d, 7d o 2w <br>4.¡Haz clic en la 'S' para SharePass!"
									$('#receiveSteps')[0].innerHTML = "1. Haga clic en aprobar para aceptar la cuenta<br/>2. Haga clic en la cuenta para iniciar sesión!";
				          break;

							case 'fr':
							    $('#subtitle')[0].innerHTML = "Partagez vos comptes sans donner vos mots de passe!";
									$('#sharingTitle')[0].innerHTML = "Partager les instructions";
									$('#receiveTitle')[0].innerHTML = "Recevoir des instructions";
									$('#sharingSteps')[0].innerHTML = "1. Connectez-vous à n'importe quel site Web <br/>2. Cliquez sur un ami ou entrez son nom d'utilisateur <br/>3. Choisissez une durée: 4h, 1d, 7d ou 2w <br>4. Cliquez sur le 'S' jaune pour SharePass!"
									$('#receiveSteps')[0].innerHTML = "1. Cliquez sur la coche pour accepter le compte<br/>2. Cliquez sur le compte pour vous connecter!";
				          break;

							case 'hi':
									$('#subtitle')[0].innerHTML = "अपना पासवर्ड साझा किए बिना अपने खाते साझा करें";
									$('#sharingTitle')[0].innerHTML = "साझा करने के लिए निर्देश";
									$('#receiveTitle')[0].innerHTML = "प्राप्त करने के निर्देश";
									$('#sharingSteps')[0].innerHTML = "1. उस खाते में साइन इन करें जिसे आप साझा करना चाहते हैं <br/>2. एक दोस्त पर क्लिक करें या ऊपर उनकी आईडी में टाइप करें <br/>3. एक अवधि चुनें: 4h, 1d, 7d या 2w <br>4. खखाता साझा करने के लिए पीले 'S' पर क्लिक करें"
									$('#receiveSteps')[0].innerHTML = "1. नया खाता स्वीकार करने के लिए टिक पर क्लिक करें।<br/>2. साइन इन करने के लिए खाते पर क्लिक करें";
				          break;

							case 'pt':
									$('#subtitle')[0].innerHTML = "Compartilhe suas contas sem revelar suas senhas!";
									$('#sharingTitle')[0].innerHTML = "Instruções para Compartilhar";
									$('#receiveTitle')[0].innerHTML = "Instruções para Receber";
									$('#sharingSteps')[0].innerHTML = "1. Faça login na conta que deseja compartilhar <br/>2. Clique ou insira o ID do amigo acima <br/>3. Escolha uma duração: 4h, 1d, 7d ou 2w <br>4. Clique no 'S' amarelo para compartilhar!"
									$('#receiveSteps')[0].innerHTML = "1. Clique na marca de seleção para aceitar a conta<br/>2. Clique na conta para entrar!";
				          break;

							case 'th':
									$('#subtitle')[0].innerHTML = "แชร์บัญชีของคุณโดยไม่ต้องให้รหัสผ่าน!";
									$('#sharingTitle')[0].innerHTML = "กระบวนการแบ่งปัน";
									$('#receiveTitle')[0].innerHTML = "กระบวนการรับ";
									$('#sharingSteps')[0].innerHTML = "1. ป้อนบัญชีที่คุณต้องการแชร์ <br/>2. คลิกหรือป้อน ID ของเพื่อนด้านบน <br/>3. เลือกช่วงเวลา: 4h, 1d, 7d หรือ 2w <br>4. คลิกที่ 'S' สีเหลืองเพื่อแชร์!"
									$('#receiveSteps')[0].innerHTML = "1. คลิกเครื่องหมายถูกเพื่อยอมรับบัญชี<br/>2. คลิกที่บัญชีเพื่อเข้าสู่!";
									break;

				    }

			});

			//
			// function changeLanguage() {
			//     var currLanguage = document.getElementById("language").value;
			//
			//     if currLanguage = "en" {
			//       alert('yeet');
			// 		}
			// };

})(jQuery);

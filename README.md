# Bot Yanush
**Discordowy Bot napisany w Discord.js przy urzyciu Nodejs**

![Bot avatar](https://raw.githubusercontent.com/KrystianJonca/Bot-Yanush/master/assets/avatar.png) 


## Konfiguracja servera
1. Stwórz wymagane kanały o następujących nazwach:
 -incidents
 -reports
 -bot
 
2. Stwórz kateogrię dla systemu forum. Jeden z kanałów w tej kategori musi nazywać się:
 -topics
 
**Po wykonaniu tych kroków możesz zaprosić bota:** http://bit.ly/Yinvite

**Przykładowa struktura serwera:**<br />
- bot(kategoria)
 - bot(kanał do urzywania komend)
 - incidents(prywatny kanał dla adminów)
 - reports(prywatny kanał dla adminów)

- forum(kategoria)
 - topics(kanał do zakładania tematów)
 - topics-1(kanał do zakładania tematów)
 - topics-2(kanał do zakładania tematów)
 

## Info
- **Nazwa bota:** Bot Yanush
- **Domyślny prefix**: "Y!"(Możliwość zmiany)

## Cechy
- Wykrywanie i usuwanie spamu
- Wykrywanie i usuwanie wiadomości pisanych caps'lockiem
- Nowoczesny system wyłapywania komend 
- Automatyczne update'owanie komendy **help**
- Reagowanie na wiadomość podczas wykonania komendy
- System logów
- Nowoczesny system wyciszeń
- Randomowa aktywność Bota

## W trakcie
- Bot Yanush Dev Discord server

## TODO
- Nowoczesna strona internetowa z możliwością zarządzania Botem(daleka przyszłość)

## Commands
***Komendy Dla adminów***: <br />
**1:** Y!ban @oznaczenie <powód> | **Opis:**  Zbanuj urzytkownika(wymagane pozwolenie) <br />
**2:** Y!cleanwarns @oznaczenie <powód> | **Opis:**  Czyszczenie ostrzeżeń urzytkownikowi <br />
**3:** Y!clear <liczba wiadomości do wyczyszczenia> | **Opis:**  Wyczyść wiadomości <br />
**4:** Y!kick @oznaczenie <powód> | **Opis:**  Wyrzuć urzytkownika(wymagane pozwolenie) <br />
**5:** Y!mute @oznaczenie <czas wyciszenia (opcjonalnie)> <powód> | **Opis:**  Wyciszenie urzytkownika(wymagane pozwolenie) <br />
**6:** Y!unmute @oznaczenie <powód> | **Opis:**  Odcisz urzytkownika(wymagane pozwolenie) <br />
**7:** Y!warn @oznaczenia <powód> | **Opis:**  Ostrzec urzytkownika(3 ostrzeżenia - wuciszenia na 15 min, 5 ostrzeżeń - ban) <br />
**8:** Y!whois @user | **Opis:**  Mention user info <br />
***Komendy Config:*** <br />
**1:** Y!ai <on/off> | **Opis:**  Auto spam mute i auto pisanie z caps lock alert functions(domyślnie wyłączone) <br />
**2:** Y!prefix <prefix do ustawienia> | **Opis:**  Ustaw prefix dla swojego serwera <br />
***Komendy Dla zabawy:*** <br />
**1:** Y!avatar | **Opis:**  Zobacz swój awatar! <br />
**2:** Y!hug @oznaczenie | **Opis:**  Przytul urzytkownika! <br />
**3:** Y!love @oznaczenie | **Opis:**  Sprawdź na ile % kochasz drugą osobę <br />
**4:** Y!ping | **Opis:**  Zobacz swój ping! <br />
**5:** Y!8ball,question <zapytanie> | **Opis:**  Zadaj mi pytanie <br />
**6:** Y!roll,dice | **Opis:**  Wylosój randomową liczbę od 0 do 6! <br />
**7:** Y!say <tekst do powiedzenia> | **Opis:**  Każ mi wysłać twoją wiadomość <br />
**8:** Y!temp,weather | **Opis:**  Dostań obecną temperaturę ( ͡ᵔ ͜ʖ ͡ᵔ ) <br />
***Komendy Forum:*** <br />
**1:** Y!topic <temat> | **Opis:**  Stwórz nowy temat <br />
***Komendy Info:*** <br />
**1:** Y!botinfo | **Opis:**  Coś o mnie! <br />
**2:** Y!date,time | **Opis:**  Dostań obecną datę! <br />
**3:** Y!help,commands,info | **Opis:**  Lista dostępnych komend! <br />
**4:** Y!serverinfo | **Opis:**  Informacje o serwerze <br />
**5:** Y!userinfo | **Opis:**  Informacje o tobie! <br />
***Komendy Inne:*** <br />
**1:** Y!report @oznaczenie <powód> | **Opis:**  Zreportuj urzytkownika <br />
*Tą listę automatycznie wygenerował mój Bot* 




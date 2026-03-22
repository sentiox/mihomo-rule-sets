// Reddit Guest Access Check Tile
// Проверяет возможность читать Reddit как гость (без логина)

const UA =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36';

function checkGuest() {
  $httpClient.get(
    {
      url: "https://www.reddit.com/r/popular.json?limit=1&raw_json=1",
      headers: {
        "User-Agent": UA,
        "Accept": "application/json",
        "Referer": "https://www.reddit.com/"
      },
      timeout: 5
    },
    function (error, response, data) {
      let status = response?.status || response?.statusCode;
      let icon = "🚫";
      let bg = "#ff3b30"; // red

      if (!error && status >= 200 && status < 400) {
        try {
          let json = JSON.parse(data);
          if (json?.data?.children) {
            icon = "✅";
            bg = "#34c759"; // green
          } else {
            icon = "⚠️";
            bg = "#ff9f0a"; // yellow
          }
        } catch {
          icon = "⚠️";
          bg = "#ff9f0a";
        }
      } else if (status === 403 || status === 451) {
        icon = "🚫";
        bg = "#ff3b30";
      } else if (error) {
        icon = "⚠️";
        bg = "#ff9f0a";
      }

      $done({
        title: "Reddit Guest",
        content: `Guest Access: ${icon}\nStatus: ${status || "N/A"}`,
        backgroundColor: bg,
        // без icon — возьмётся иконка из tiles
        url: "https://www.reddit.com"
      });
    }
  );
}

checkGuest();

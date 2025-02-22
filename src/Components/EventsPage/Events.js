import React, { useState, useEffect } from "react";
import EventCard from "./EventCard";
import "./EventCard.scss";
import "./Events.scss";
const axios = require("axios");
const cheerio = require("cheerio");
var pastEvents = [
  {
    id: "9",
    imgsrc: "RangaK.png",
    url: "https://www.youtube.com/watch?v=fu75vu6Nnnk",
  },
  {
    id: "8",
    imgsrc: "AyushSing.png",
    url: "https://www.youtube.com/watch?v=fu75vu6Nnnk",
  },
  {
    id: "1",
    imgsrc: "30days.jpeg",
    url: "",
  },
  {
    id: "2",
    imgsrc: "cloudComputing.jpeg",
    url: "https://www.youtube.com/watch?v=BTA_5GK3C_I",
  },
  {
    id: "3",
    imgsrc: "CodethonPoster.jpeg",
    url: "https://www.youtube.com/channel/UCsq-cbi1tZStoem3KVQVjCg/videos",
  },
  {
    id: "4",
    imgsrc: "codethon2.0.jpeg",
    url: "https://www.youtube.com/channel/UCsq-cbi1tZStoem3KVQVjCg/videos",
  },
  {
    id: "5",
    imgsrc: "cybersecurity.jpeg",
    url: "https://www.youtube.com/watch?v=3DzD_LBJCe4",
  },
  {
    id: "6",
    imgsrc: "gitGithub.jpeg",
    url: "https://www.youtube.com/watch?v=8jBivxwdizw&t=1502s",
  },
  {
    id: "7",
    imgsrc: "orientationPoster.jpeg",
    url: "",
  },
];
var upcommingEvents = [
  {
    id: "1",
    imgsrc: "DebasmitaSarkar.png",
    url: "",
  },
];
var webdata = "";

async function getData() {
  await axios
    .get(url)
    .then((res) => {
      webdata = res.data;
      console.log("I am loaded");
      const $ = cheerio.load(webdata);
      if ($("#past-events .vertical-boxes a").attr("href") != undefined) {
        pastEvents = [];
        $("#past-events .vertical-boxes a:nth-child(n)").each((i, elem) => {
          // console.log($(elem).find('p.vertical-box--event-date').text())
          pastEvents.push({
            id: i + 1,
            link: "https://dsc.community.dev/" + $(elem).attr("href"),
            date: $(elem)
              .find("p.vertical-box--event-date")
              .text()
              .replace(/  |\n/g, ""),
            type: $(elem)
              .find("p.vertical-box--event-type")
              .text()
              .replace(/  |\n/g, ""),
            title: $(elem)
              .find("p.vertical-box--event-title")
              .text()
              .replace(/  |\n/g, ""),
            image: $(elem).find("img").attr("src"),
          });
        });
      } else {
        pastEvents = [];
        pastEvents = $("#past-events .general-body--color").text();
      }
      if ($("#upcoming-events .event-list a").attr("href") != undefined) {
        upcommingEvents = [];
        console.log("found");
        $("#upcoming-events .event-list .row:nth-child(n)").each((i, elem) => {
          // console.log($(elem).find('p.vertical-box--event-date').text())
          upcommingEvents.push({
            id: i + 1,
            link:
              "https://dsc.community.dev/" +
              $(elem).find("a.picture").attr("href"),
            date: $(elem).find("div.date strong").text().replace(/  |\n/g, ""),
            type: $(elem).find("div.date span").text().replace(/  |\n/g, ""),
            title: $(elem)
              .find("h4.general-body--color")
              .text()
              .replace(/  |\n/g, ""),
            image: $(elem).find("img").attr("src"),
          });
        });
      } else {
        upcommingEvents = [];
        upcommingEvents = $("#upcoming-events .general-body--color").text();
      }
    })
    .catch((error) => {
      console.log(error);
    });
}

const url =
  "https://dsc.community.dev/jaypee-institute-of-information-technology-sec-128/";

const EventsPage = ({ isDark }) => {
  const [pastData, setpastData] = useState();
  const [upcomingData, setupcomingData] = useState();
  useEffect(() => {
    getData()
      .then(() => {
        setpastData(pastEvents);
        if (upcommingEvents[0].id) {
          setupcomingData(upcommingEvents);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div id="events" class={isDark ? "eventsectionDark" : "pageEvent"}>
      <div className="eventsection">
        <h1>Upcoming Events</h1>
        <div className="cards">
          {upcomingData
            ? upcomingData.map((event) => {
                return (
                  <a className="eventCard" href={event.url} target="_blank">
                    <img
                      src={require(`../../images/upcommingEventspics/${event.imgsrc}`)}
                    />
                  </a>
                );
              })
            : "There are no upcomming Events right now!!!"}
        </div>
      </div>
      <div className="eventsection">
        <h1>Past Events</h1>
        <div className="cards">
          {pastData
            ? pastData.map((event) => {
                return (
                  <a className="eventCard" href={event.url} target="_blank">
                    <img
                      src={require(`../../images/previousEvents/${event.imgsrc}`)}
                    />
                  </a>
                );
              })
            : null}
        </div>
      </div>
    </div>
  );
};

export default EventsPage;

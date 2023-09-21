---
title: Essential Innovations, Courtesy Hackathon
tags: [medicine, essential, embedded, hacks]
date: 2020-02-25
draft: false
summary:
canonicalUrl: https://vinayakg.dev/essential-innovations-courtesy-hackathon
---

The recent hackathon that we hosted [last month at Pickyourtrail](https://linkedin.com/posts/pickyourtrail_lifeatpickyourtrail-startup-startuplife-activity-6628647964623638528-2CFX) was a successful hackathon that saw 10 teams participating and a ton of innovation and yes some learnings for us on how we can do better.

This hackathon event was organized by [Sastra University](https://inlinkedin.com/company/sastra-university) and Pickyourtrail was invited to be the jury for the theme: Smart Health. This was a 36 hour hackathon that ended on 22nd Jan with 65 participants across 14 teams from across different states. I am listing down my experience with this hackathon and what I saw and what I felt and yes what I learnt.

**Problem Statement**

Smart Health: The idea is to digitize the health records for all children to drive immunization across all sections of society, improve awareness and make healthcare accessible to one and all.

### **Participants**

Students had come from various states belonging to 14 different colleges, with students from 2nd, 3rd and 4th year from IT, CS and Electronics background. All these students were brimming with confidence and were very keen and forward-looking. Most of the students were well prepared, had planned well and wanted to contribute something meaningful.

## **Hacks and Solutions**

Myself and [Raj](https://www.linkedin.com/in/raj-kumar-5ba700103/) reached on Saturday morning and we witnessed a wide range of hacks ranging from simple web forms capturing data on the website and analyzing them to hardware hacks using sensors to measure data from the human body to securing health data using blockchain. Yes there were ideas of all kinds that were put to test and implemented. It was just overwhelming to see students working on a wide range of ideas covering hardware and software with a lot of ease and authority. Also the students had attained subject matter expertise on human biology, software and electronics while solving their problems. There was tremendous participation and each had something unique to bring to the table.

I am going to list down 2 projects here (the winners of course :) ). There were three projects that stood out amongst 14 but the third was essentially similar to the second one and was built with expensive parts so I will leave that for now.

## **Project 1- Health in Hands**

This team had developed a working prototype that measures body temperature, heart rate and humidity.

They had built it using following hardware

- ESP-12E NodeMCU (Read [here](https://www.instructables.com/id/Programming-ESP8266-ESP-12E-NodeMCU-Using-Arduino-/))
- DHT 11 - Humidity sensor
- Heart rate sensor (RC-A-4015)
- Temperature sensor (LM-35)

Please see image below

![Circuit built](../static/images/circuit_built.png)

And the output here

![Dashboard built by team](../static/images/dashboard_built_by_team.png)

### **How it was built:**

The sensors were soldered to ESP-12E NodeMCU and was powered by a 5V battery to supply power and the serial port was connected to the computer (output from serial port was captured by the Python program) which was capturing the data and writing it to the Firebase database. Yes Firebase. It's a real-time Database that synchronizes data across all devices and stores data on Firebase cloud. This is a very good usage of Firebase database where you want to update the UI near real-time across devices. The output can be seen above from various sensors.

Not only this, the team had developed an alerting system (SMS/phone call) to message parents/doctors if the combination of values were found below the recommended values. Great possibilities.

And all this actually worked !!!

## **Project 2- Healthy companion**

This team had developed a working prototype that measures body temperature, BMI (Body Mass Index), Oxygen Level in the body (dissolved oxygen) and humidity.

They had built it using following hardware

- Max 30100 (Read [here](https://datasheets.maximintegrated.com/en/ds/MAX30100.pdf))
- Temperature sensor (LM-35)

Please see below image

![Circuit diagram specifications](../static/images/circuit_diagram_specifications.png)

And the output here

![Central Dashboard](../static/images/central_dashboard.png)

### **How it was built:**

The sensors were soldered to Max 30100 and was powered by a 5V battery to supply power and the serial port was connected to the computer (output from serial port was captured by the Python program) which was capturing the data and writing it to the Firebase database. Again, a good choice of database. The output can be seen above from various sensors.

The results were then to be seen instantaneously in the demo.

Students even started digging deeper about the challenges when the the oxygen level is lesser than 90 based on data for a certain region/city. We could further figure out if the oxygen content was low in the water that they were consuming. Tremendous possibilities.

### **Takeaways:**

All this actually exposed me to a plethora of concepts/knowledge which I was not aware but was looking forward to. It also showed me that we can build some essential healthcare stuff that could be life-saving (post validation and approval) as well as used for preventive healthcare for the well being of the society. It also showed that these things need not be very expensive (costs approx. INR 500) and it is possible to put basic healthcare in the hands of every individual no matter which sections of society they belong to. It’s also one of my aspirations to do something similar whenever I get to and decide to do it.

### **Learnings:**

Students from different streams like Electronics and Computer Science had collaborated to leverage the capabilities in both the streams and deliver a great hardware and software cost-effective integration. True teamwork.

Both the above teams were from 2nd year of Engineering and this was their first hackathon. So it was their will, determination and self belief that made it possible for them.

One of the teams was all-girls and they travelled almost 500 kms to take part in this and also won the competition. This just shows how eager they were to contribute, participate and learn.

Two other teams had very interesting ideas around using ML on the publicly available health datasets to recommend and analyze the data for improving nutrition amongst children, improve life expectancy, etc. Looking forward to on-board some of the folks for our internship.

That's all for this time. Hope to write more in the future.

References:

https://www.vizinexrfid.com/ask-experts-much-data-can-stored-rfid-tag-secure/

https://en.wikipedia.org/wiki/Firebase

https://www.instructables.com/id/Programming-ESP8266-ESP-12E-NodeMCU-Using-Arduino-/

https://www.nhlbi.nih.gov/health/educational/lose_wt/BMI/bmicalc.htm

https://datasheets.maximintegrated.com/en/ds/MAX30100.pdf

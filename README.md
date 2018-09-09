# medhacks-zzg
MedHacks 2018 Team ZZG

# Pitch
Meet ZZG, your personalized, at-home sleep lab. ZZG provides tailored sleep hygiene suggestions based on Emotiv EPOC + EEG data.

# Features
* ZZG uses EEG data to provide recommendations to improve quality of sleep (mocked)
* EEG data defines quantitative metrics such as stress levels and excitement during sleep
* EEG data can be used to predict sleep disorders by identifying time spent in the 5 sleep stages (mocked)

# Future work: 
* Use EEG to determine sleep quality using entropy index
  * Sleep quality entropy calculation: http://daedalus.scl.sztaki.hu/phdws2004/abstract/phdws2004_abstract_4.pdf
  * Sleep labs calculate sleep quality through sleep efficiency index, (Hours in stage 3 + Hours in stage 4)/(total hours of sleep). This is inconvenient because you need to go to a sleep lab to do this. 
  * Paper suggests that there is a correlation between sleep efficiency index and proposed entropy index. More positive entropy, poorer quality of sleep. Above -1.313 means poor sleep. Need at least 2 seconds intervals of EEG data to calculate this. 
* Connect to visualization API to visualize EEG data in real time 
* Lifestyle questionnaire 
  * Collect initial data on lifestyle to help provide recommendations 
  * How would we use this data? 
* Community health functionality
  * Status quo data: Map that shows that sleep quality is lacking geographically 
  * Demonstrates need for ZZG 
  * App user geographical data: Show how user’s data compares to users around them 
  
# Preview
Open `homepage.html` in `/frontend`

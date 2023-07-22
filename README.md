# Resume-Parser

Projected Assigned by **HeadStarter** and **Mofizur Rahman**, Developer Relations Engineer at **Google**.  
Created by Tristan Pinzari, Kenny Frias, and Daniel Galvez.

## Inspriation / Problem We Are Solving

The hiring process for large companies is often a lengthy and costly process. Every year some FAANG companies recieve upward of 10M applications.

## What is Resume Parser

Resume Parser allows applicants to upload their resume to the company's cloud storage. After applicants upload their resume, recruiters can look and search for resumes using keywords on the recruiter dashboard.

## Technology Stack

**Frontend**

- HTML
- CSS

**Backend**

- Node
- Firebase
- JavaScript

## Applicant Interface

Applicants will be able to upload their resume by selecting the pdf on their computer and clicking the upload button.

![applicant demo video](https://github.com/TristanPinzari/Resume-Parser/blob/main/ezgif-5-c5ba34b03e.gif)

## Recruiter Interface

Recruiters can click on the recruiter button to open the recruiter dashboard. There they can search for **keywords** which will filter and only show resume containing the keywords.

![recruiter demo video](https://github.com/TristanPinzari/Resume-Parser/blob/main/ezgif-5-08538d3d55.gif)

## Hurdles

1. This was our first time using React, Node, and Firebase
2. Finding a good PDF API was difficult since many had little documentation and many bugs
3. Displaying the original PDF instead of the text file was tricky

## Future Iterations

1. add authentication to access the recruiter and applicant dashboards

## How to Run

1. Install all the necessary dependencies for the code to compile properly. <br>

```
apiKey: "Your API key",
authDomain: "Your authorized domain",
projectId: "Your project ID",
storageBucket: "Your storage bucket",
appId: "Your app ID",
```

2. Run `npm run dev` in the project's terminal
   Opens Resume Parser app in your browser <br>
   By default it will open [http://127.0.0.1:5500/applicant.html](http://127.0.0.1:5500/applicant.html)

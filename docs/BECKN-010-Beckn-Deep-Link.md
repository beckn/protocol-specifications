# Context
Beckn is fast catching up as a viable protocol for many transactional oriented systems. While beckn abstracts much of transactional complexities by standardizing specifications and protocol imperatives, it is pertinent that beckn gets identified as an established anchor tag, in line with what upi has done for major platforms (HTML, Android, iOS etc.). A similar tag is available in whatsapp as well. Following are few examples:

```
upi://pay?pa=upiaddress@okhdfcbank&pn=JohnDoe&cu=INR
whatsapp://send?abid=phonenumber&text=Hello%2C%20World!
```

# Problem
One of the immediate use case for this purpose is enabling QR code for merchant shops. Today, the QR code are either very localized to merchant or have a platform centric approach, where the embedded QR code can only direct to a specific app. There is a need for unbundling this and creating a deep link enabled through anchor tags like that of in upi, that will enable the discovery of store irrespective of the BPP they are associated with. Each BAP shall need to respect a standard anchor tag identified through a beckn complaint application and make the catalog for store visible on device. The anchor tag will also ensure that specific SDKs/Libraries will have an identification of beckn as protocol which developers can use to activate boilerplate codes. 

# Proposed Solution
We are proposing to have something similar to that of UPI anchor tags, that most platforms for ready references within applications which can be embedded in QR codes. 

**Use Case 1:**

The QR code will be available at a seller place like in-store displays, physical advertisements etc. which can be scanned by any buyer willing to look at the catalog. While a QR code is scanned, it will identify the apps that support the URI or are beckn enabled and will return an on_search response with the catalog. The deep link may look like:

```
beckn://ondc?bppID=<BPP ID>&providerID=<provider ID>&providerName=<name of the store>
```

**Use Case 2:**

The beckn enabled deep link can be used in conjunction with voice-based search. When a buyer is looking for coffee using a voice-based search, it can construct the beckn enabled deep link by embedding the recognized keywords into the deep link, which then instructs the OS to identify the apps that support the URI or are beckn enabled and can pass the data embedded in the link to show relevant results in the app.
The deep link may look like:

```
beckn://ondc?intent=<item/service>&endloc=<gps_coordinates>
```

**Use Case 3:**

The beckn enabled deep links can be integrated with advertisements or campaigns to direct users from an add to a beckn enabled application to show relevant results. 


This will ensure that major software platforms and browsers start recognizing with the protocol beckn. For ONDC, we propose to use the nomenclature above. 

The flow of one of the use case is:

1.	QR code will scan and input the uri string with beckn as prefix to the scanner. 
2.	If scanned  in a beckn compatible app, the app will extract relevant information and render the page accordingly
3.	If scanned in default scanners on devices, the scanners will read and scan for beckn compatible apps and provide a list with options to the user

# Examples

```
beckn://ondc?bppID=<BPP ID>&providerID=<provider ID>&providerName=<name of the store>
```

# References

•	UPI github links for UPI example https://github.com/bhar4t/upiqr
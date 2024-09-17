import requests
from bs4 import BeautifulSoup
import time

url_prompt = input('Give a course you want to search in coursera: ')
url_prompt = url_prompt.strip()
url_prompt = url_prompt.lower()
url_prompt = url_prompt.replace(' ', '+')
# print(url_prompt)
# URL of the Coursera search page
url = f'https://www.coursera.org/search?query={url_prompt}&q=search&language=English'

# Send a request to the webpage
response = requests.get(url)

time.sleep(3)
# Parse the page content
soup = BeautifulSoup(response.text, 'html.parser')

# Find all course titles
courses = soup.find_all('div', class_='cds-ProductCard-base cds-ProductCard-grid css-1gwppjr')
ching  = soup.find_all('h3', class_='cds-CommonCard-title css-6ecy9b')
chong = soup.find_all('p', class_ = "cds-ProductCard-partnerNames css-vac8rf")
rating = soup.find_all('p', class_ = "css-2xargn")
links = soup.find_all('a', class_='cds-119 cds-113 cds-115 cds-CommonCard-titleLink css-si869u cds-142')
# Ensure both lists have the same length to avoid index mismatch
min_len = min(len(ching), len(chong), len(rating), len(links))
# Find all anchor tags with the specific class containing href (link) information

# Print course titles along with their partners
for idx in range(min_len):
    course_title = ching[idx].text.strip()
    partner_name = chong[idx].text.strip()
    rating_name = rating[idx].text.strip()
    link = 'www.coursera.org'+links[idx].get('href')
    print(f"{idx+1}. Coursera: {course_title} | Partner: {partner_name} | Rating: {rating_name} | Link: {link}")
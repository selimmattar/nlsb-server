class Unbuffered(object):
   def __init__(self, stream):
       self.stream = stream
   def write(self, data):
       self.stream.write(data)
       self.stream.flush()
   def writelines(self, datas):
       self.stream.writelines(datas)
       self.stream.flush()
   def __getattr__(self, attr):
       return getattr(self.stream, attr)

from urllib import parse
from urllib import request
import sys
import bs4
from urllib.request import urlopen as uReq
from bs4 import BeautifulSoup as soup

url = 'https://www.randomwordgenerator.org/Random/sentence_generator/'
data = parse.urlencode({'quantity' : '1',
                         'contain'  : sys.argv[1],
                         'count'  : '0'}).encode("utf-8")

hdr = {'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.11 (KHTML, like Gecko) Chrome/23.0.1271.64 Safari/537.11',
       'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
       'Accept-Charset': 'ISO-8859-1,utf-8;q=0.7,*;q=0.3',
       'Accept-Encoding': 'none',
       'Accept-Language': 'en-US,en;q=0.8',
       'Connection': 'keep-alive'}
myrequest = request.Request(url,data,hdr)
page_html = request.urlopen(myrequest).read()
page_soup = soup(page_html,'html.parser')
result = page_soup.find("p",{"class":"result res-sentence"}).b
dataToSend = str(result)[7:len(str(result))-5]
print(dataToSend)

sys.stdout = Unbuffered(sys.stdout)
sys.stdout.flush()
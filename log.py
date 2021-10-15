import datetime
import codecs

def gettime():
    date = datetime.datetime.now().strftime("%x")
    time = datetime.datetime.now().strftime("%X")
    x = '['+date+' '+time+']'
    return x

def log(funct, orig, ans):
    logmessage = gettime()+" reqfor: "+funct+" req: "+orig+" returned: "+ans
    log = codecs.open('log.txt', 'a', 'utf-8-sig')
    log.write(logmessage+"\n")
    log.close()
    return logmessage
def spl(x):
    return [char for char in x]

def qwkm(x):
    tha = ['ๅ','/','-','ภ','ถ','ุ','ึ','ค','ต','จ','ข','ช','+','๑','๒','๓','๔','ู','฿','๕','๖','๗','๘','๙','ๆ','ไ','ำ','พ','ะ','ั','ี','ร','น','ย','บ','ล','๐','"','ฎ','ฑ','ธ','ํ','ี','ณ','ฯ','ญ','ฐ',',','ฟ','ห','ก','ด','เ','้','่','า','ส','ว','ง','ฤ','ฆ','ฏ','โ','ฌ','็','๋','ษ','ศ','ซ','.','ผ','ป','แ','อ','ิ','ื','ท','ม','ใ','ฝ','(',')','ฉ','ฮ','ฺ','์','?','ฒ','ฬ','ฦ']
    eng = ['1','2','3','4','5','6','7','8','9','0','-','=','!','@','#','$','%','^','&','*','(',')','_','+','q','w','e','r','t','y','u','i','o','p','[',']','Q','W','E','R','T','Y','U','I','O','P','{','}','a','s','d','f','g','h','j','k','l',';',"'",'A','S','D','F','G','H','J','K','L',':','"','z','x','c','v','b','n','m',",",'.','/','Z','X','C','V','B','N','M','<','>','?']
    phrase = spl(x)
    phraselength = len(phrase)
    ans = []
    i = 0
    while i<phraselength:
        if phrase[i]==',':
            if phrase[i-1] in eng:
                ans.append(tha[eng.index(phrase[i])])
            elif phrase[i-1] in tha:
                ans.append(eng[tha.index(phrase[i])])
            else:
                ans.append(tha[eng.index(phrase[i])])
        if phrase[i]=='.':
            if phrase[i-1] in tha:
                ans.append(eng[tha.index(phrase[i])])
            elif phrase[i-1] in eng:
                ans.append(tha[eng.index(phrase[i])])
            else:
                ans.append(tha[eng.index(phrase[i])])
        elif phrase[i]=='-':
            if phrase[i-1]==' ' and phrase[i+1]==' ':
                ans.append(eng[tha.index(phrase[i])])
            elif phrase[i-1] in tha:
                ans.append(eng[tha.index(phrase[i])])
            elif phrase[i-1] in eng:
                ans.append(tha[eng.index(phrase[i])])
            else:
                ans.append(eng[tha.index(phrase[i])])
        elif phrase[i] in tha:
            ans.append(eng[tha.index(phrase[i])])
        elif phrase[i] in eng:
            ans.append(tha[eng.index(phrase[i])])
        elif phrase[i]==' ':
            ans.append(' ')
        else:
            ans.append(phrase[i])
        i+=1
    answer = ''.join(ans)
    return answer
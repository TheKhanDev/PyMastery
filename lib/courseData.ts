import { Module } from './types';
import { moduleColors } from './theme';

export const modules: Module[] = [
  {
    id: 'mod-01',
    order: 1,
    title: 'Python Shuru Karte Hain',
    subtitle: 'Install karo aur apna pehla program likho',
    icon: 'rocket-outline',
    color: moduleColors[0],
    lessons: [
      {
        id: 'l-01-01',
        title: 'Python Kya Hai Bhai?',
        minutes: 6,
        summary: 'Python ki history, philosophy, aur ye itna popular kyun hai — Hinglish mein samjho.',
        content: [
          'Chalo yaar, sabse pehle basic sawal: Python hai kya cheez? Ye ek high-level, interpreted programming language hai jo Guido van Rossum ne 1991 mein banayi thi. Iska matlab hai ke ye code likhna bohat easy hai, aur seekhne walon ke liye best language consider hoti hai — na zyada complicated syntax, na ghanta bhar semicolons dhoondhna.',
          'Ab tak tum ne suna hoga ke Python web development (Django, Flask), data science (Pandas, NumPy), machine learning/AI (PyTorch, TensorFlow), automation scripts, aur games tak mein use hoti hai. Google, Netflix, Instagram jese giants roz Python use karte hain — to samjho ye sirf "student wali language" nahi, industry standard hai.',
          'Python ka ek fun feature hai "Zen of Python" — agar tum Python shell mein `import this` likho to ek poem show hoti hai jo Python ki philosophy batati hai: "Beautiful is better than ugly. Simple is better than complex." Yani code clean aur readable hona chahiye, show-off wala complicated nahi.',
          'Ek important cheez samajh lo: Python "dynamically typed" hoti hai — matlab variable ka type declare karne ki zaroorat nahi (jese C++ mein int x = 5 likhte hain), Python khud samajh leti hai. Aur memory management (garbage collection) bhi automatic hoti hai, to beginners ke liye ye ekdum tension-free language hai.',
        ],
        examples: [
          { code: 'import this', output: 'The Zen of Python, by Tim Peters\n\nBeautiful is better than ugly.\nExplicit is better than implicit.\nSimple is better than complex.\n...', caption: 'Python ke andar chupa hua ek Easter egg — try karke dekho!' },
        ],
        keyPoints: [
          'Python interpreted language hai, direct machine code mein compile nahi hoti',
          'Indentation (whitespace) se code ka structure define hota hai, curly braces nahi',
          'Web dev, data science, AI, automation — har jaga use hoti hai',
          'PyPI (Python Package Index) pe hazaron free libraries available hain',
        ],
        commonMistakes: [
          'Galti: "Python sirf beginners ke liye hai" sochna — reality mein ye enterprise-level companies bhi use karti hain, to seriously seekho.',
          'Confusion: Python 2 aur Python 3 mein farak hai — hamesha Python 3 seekho, Python 2 ab officially retire ho chuki hai (2020 se).',
          'Quirk: `print` Python 2 mein statement tha (bina brackets), Python 3 mein function hai — hamesha `print()` brackets ke sath likho.',
        ],
      },
      {
        id: 'l-01-02',
        title: 'Python Install Karna – Step by Step',
        minutes: 8,
        summary: 'Windows, macOS, ya Linux — har jaga Python set up karna seekho.',
        content: [
          'Sabse pehle python.org se latest Python 3 version download karo. Windows pe install karte waqt ek checkbox milega "Add Python to PATH" — usse zaroor tick karna, warna terminal se Python chalane mein masla ho ga. macOS pe Homebrew (`brew install python3`) use kar sakte ho, aur Linux mein zyada tar distros already Python 3 ke sath aati hain.',
          'Install hone ke baad terminal (ya Command Prompt) khol kar likho `python3 --version` (Windows pe kabhi kabhi sirf `python --version` chalta hai). Agar "Python 3.12.x" jesa kuch show ho raha hai to samjho set up ho gaya, ab tayyar ho code likhne ke liye.',
          'Code likhne ke liye ek achi editor chahiye hoti hai. VS Code (free hai) sabse popular choice hai — bas Python extension install kar lo. Agar data science side jana hai to Jupyter Notebook bhi try kar sakte ho, wo interactive cells mein code chalati hai.',
          'Agar abhi kuch install nahi karna chahte, koi masla nahi — replit.com jese online compilers use kar ke bhi Python seekh sakte ho, bilkul free mein, browser ke andar hi.',
        ],
        examples: [
          { code: 'python3 --version', output: 'Python 3.12.1' },
          { code: 'python3', output: 'Python 3.12.1 (main, ...)\n>>> print("Salam Dunya!")\nSalam Dunya!', caption: 'Interactive REPL shell chalu karna — turant test kar sakte ho' },
        ],
        keyPoints: [
          'python.org se download karo, Windows pe "Add to PATH" zaroor tick karo',
          'VS Code + Python extension ek perfect free combo hai seekhne ke liye',
          'REPL (>>>) mein chhote snippets turant test ho sakte hain',
          'Agar do versions (2 aur 3) system pe hain to `python3`/`pip3` explicitly use karo',
        ],
        commonMistakes: [
          'Galti: "Add to PATH" checkbox skip kar dena — phir terminal bolega "python is not recognized". Reinstall kar ke ye box tick karo.',
          'Confusion: Kai purane tutorials mein `python` command diya hota hai, lekin naye systems mein `python3` likhna padta hai — dono try kar lo.',
          'Quirk: VS Code mein sahi Python interpreter select karna zaroori hai (bottom-right corner mein dikhta hai), warna wrong version pe code chal sakta hai.',
        ],
      },
      {
        id: 'l-01-03',
        title: 'Pehla Program: Hello, Dunya!',
        minutes: 5,
        summary: '.py file banao, likho, aur terminal se run karo — sab kuch step by step.',
        content: [
          'Har programmer ki zindagi ka pehla program hota hai jo screen pe "Hello, World!" print karta hai. Python mein ye kaam sirf ek line mein ho jata hai — shukar hai built-in `print()` function ka.',
          'Ek naya file banao, naam do `hello.py`, us mein neeche wala code likho, save karo, aur terminal mein type karo `python3 hello.py`. Bas, tumhara pehla Python program chal gaya!',
          '`print()` function ek se zyada arguments le sakta hai jo comma se separate hote hain, aur default mein space se join ho kar print hote hain, end mein newline add ho jati hai. Agar chaho to `sep` aur `end` keyword arguments se ye behavior customize kar sakte ho.',
        ],
        examples: [
          { code: 'print("Hello, World!")', output: 'Hello, World!' },
          { code: 'print("Python", "mazedar", "hai", sep="-")', output: 'Python-mazedar-hai' },
          { code: 'print("Loading", end="...")\nprint("Ho gaya!")', output: 'Loading...Ho gaya!' },
        ],
        keyPoints: [
          '`print()` terminal/console pe text likhta hai',
          'Script run karne ka tareeqa: `python3 filename.py`',
          '.py Python files ka standard extension hai',
          '`sep` aur `end` se print() ka output customize hota hai',
        ],
        commonMistakes: [
          'Galti: File save karte waqt `.py` extension bhool jana — file `hello.txt` ban jati hai aur Python run nahi kar pati.',
          'Confusion: `print "Hello"` likhna (bina brackets) — ye Python 2 style hai, Python 3 mein hamesha `print("Hello")` likho.',
          'Quirk: Agar terminal wrong folder mein khula ho to "file not found" error aata hai — pehle `cd` se sahi directory mein jao.',
        ],
      },
      {
        id: 'l-01-04',
        title: 'Comments aur Code Style — Saaf Suthra Code',
        minutes: 5,
        summary: 'Apna code explain karo aur PEP 8 style guide follow karo.',
        content: [
          'Comments `#` se shuru hote hain aur Python inhe bilkul ignore karti hai. Comments ka use "kyun" explain karne ke liye karo, na ke "kya" — code khud bata deta hai kya ho raha hai, comment bataye ke kyun ho raha hai.',
          'Multi-line comments/docstrings ke liye triple quotes `\\\'\\\'\\\'` ya `"""` use hote hain. Docstrings functions, classes, modules ko document karne ke kaam aate hain, aur `help()` function se inhe dekha ja sakta hai.',
          'PEP 8 Python ka official style guide hai: 4 spaces per indent level use karo (tabs nahi), variables/functions ke liye snake_case, classes ke liye PascalCase, aur lines ko lamba mat karo (80-99 characters tak rakho).',
        ],
        examples: [
          { code: '# Ye circle ka area nikalta hai\nradius = 5\narea = 3.14159 * radius ** 2\nprint(area)  # 78.53975 print hoga', output: '78.53975' },
          { code: 'def greet():\n    """Ek friendly salam print karta hai."""\n    print("Hi doston!")\n\nhelp(greet)', output: 'Help on function greet in module __main__:\n\ngreet()\n    Ek friendly salam print karta hai.' },
        ],
        keyPoints: [
          '`#` se single-line comment shuru hota hai',
          'Triple-quoted strings docstring ka kaam bhi karte hain',
          'PEP 8: 4-space indentation aur snake_case naming recommend karta hai',
          'Achay comments intent explain karte hain, obvious mechanics nahi',
        ],
        commonMistakes: [
          'Galti: Har line pe comment likhna jo obvious hai (jese `x = 5  # x ko 5 set karo`) — ye time waste hai, sirf tricky logic explain karo.',
          'Confusion: Tabs aur spaces mix karna — Python error de deti hai "inconsistent use of tabs and spaces". Editor mein tabs ko spaces mein convert karne ka setting on rakho.',
          'Quirk: Docstring aur normal comment mein farq hai — docstring function/class ke andar sabse pehli line honi chahiye triple quotes ke sath.',
        ],
      },
    ],
    quiz: [
      { id: 'q-01-1', question: 'Python ko kis ne banaya tha?', options: ['Dennis Ritchie', 'Guido van Rossum', 'James Gosling', 'Bjarne Stroustrup'], correctIndex: 1, explanation: 'Guido van Rossum ne 1991 mein Python release ki thi.' },
      { id: 'q-01-2', question: 'Python mein code ka block kis se define hota hai?', options: ['Curly braces {}', 'Indentation (whitespace)', 'Semicolons', 'Parentheses'], correctIndex: 1, explanation: 'Python consistent indentation use karti hai, braces ki jaga.' },
      { id: 'q-01-3', question: 'app.py file run karne ka sahi command kya hai?', options: ['run app.py', 'python3 app.py', 'python.exe -open app.py', 'exec app.py'], correctIndex: 1, explanation: '`python3 app.py` Python 3 interpreter se script chalata hai.' },
      { id: 'q-01-4', question: 'Comment shuru karne ka symbol kya hai?', options: ['//', '#', '--', '<!--'], correctIndex: 1, explanation: 'Hash symbol # Python mein comment start karta hai.' },
      { id: 'q-01-5', question: 'PEP 8 kya define karta hai?', options: ['Python ka garbage collector', 'Official style guide', 'Ek built-in library', 'Python 4 ka roadmap'], correctIndex: 1, explanation: 'PEP 8 readable Python code likhne ka style guide hai.' },
    ],
  },
  {
    id: 'mod-02',
    order: 2,
    title: 'Variables aur Data Types',
    subtitle: 'Data ko store karo aur manipulate karo',
    icon: 'cube-outline',
    color: moduleColors[1],
    lessons: [
      {
        id: 'l-02-01',
        title: 'Variables aur Assignment',
        minutes: 7,
        summary: 'Bina type declare kiye variable banana seekho.',
        content: [
          'Variable ek naam hota hai jo kisi value se attach hota hai. Python dynamically typed hai — tumhe type declare nahi karna, jo value assign karogay usi se type samajh liya jata hai, aur ye badal bhi sakta hai baad mein.',
          'Variable ka naam letter ya underscore se start hona chahiye, phir letters/numbers/underscores aa sakte hain, aur case-sensitive hote hain. Descriptive naam rakho jese `total_price`, sirf `tp` mat likho — dosron ko (aur khud ko baad mein) samajhna easy hoga.',
          'Ek line mein multiple variables assign kar sakte ho, aur ek unique Python trick: bina temporary variable ke do variables ki values swap kar sakte ho tuple unpacking se.',
        ],
        examples: [
          { code: 'name = "Ali"\nage = 22\nheight = 5.8\nprint(name, age, height)', output: 'Ali 22 5.8' },
          { code: 'a, b = 1, 2\na, b = b, a\nprint(a, b)', output: '2 1', caption: 'Ek hi line mein do variables swap — koi temp variable nahi chahiye' },
          { code: 'x = 5\nx = "ab string ban gaya"\nprint(x)', output: 'ab string ban gaya', caption: 'Dynamic typing — variable ka type runtime pe badal sakta hai' },
        ],
        keyPoints: [
          'Variables `=` se banaye jate hain, koi type keyword nahi chahiye',
          'Naam case-sensitive hote hain, convention snake_case hai',
          '`a, b = b, a` se swap ho jata hai bina temp variable ke',
          'Variable ka type runtime pe change ho sakta hai (dynamic typing)',
        ],
        commonMistakes: [
          'Galti: Variable naam number se start karna (jese `1name`) — Python error dega, hamesha letter/underscore se start karo.',
          'Confusion: `Name` aur `name` do alag variables hain (case-sensitive) — spelling consistent rakho warna "NameError" milega.',
          'Quirk: Reserved keywords (jese `class`, `for`, `if`) ko variable naam nahi bana sakte — Python inhe khud use karti hai.',
        ],
      },
      {
        id: 'l-02-02',
        title: 'Numbers: int, float, complex',
        minutes: 7,
        summary: 'Numeric types aur arithmetic operators samjho.',
        content: [
          'Python mein teen built-in numeric types hoti hain: int (whole numbers, unlimited precision), float (decimal numbers), aur complex (imaginary part wale numbers, jese 3+4j).',
          'Arithmetic operators: `+` `-` `*` `/` (true division, hamesha float deta hai), `//` (floor division, sirf whole number), `%` (modulus/baaki bacha hua), `**` (power/exponent).',
          '`type()` function se check kar sakte ho variable ka type kya hai, aur `int()`, `float()`, `str()` se explicit type conversion (type casting) kar sakte ho.',
        ],
        examples: [
          { code: 'print(7 / 2)   # true division\nprint(7 // 2)  # floor division\nprint(7 % 2)   # remainder\nprint(2 ** 10) # power', output: '3.5\n3\n1\n1024' },
          { code: 'x = 10\nprint(type(x))\ny = float(x)\nprint(y, type(y))', output: "<class 'int'>\n10.0 <class 'float'>" },
        ],
        keyPoints: [
          'Python mein int ki precision unlimited hoti hai',
          '`/` hamesha float deta hai, `//` floored integer deta hai',
          '`**` power/exponent operator hai',
          '`type()` se type check karo; `int()/float()/str()` se convert karo',
        ],
        commonMistakes: [
          'Galti: `/` aur `//` mein confuse hona — `/` hamesha decimal deta hai (7/2 = 3.5), `//` sirf whole part (7//2 = 3).',
          'Quirk: Negative numbers pe `//` "round down" karta hai, "round toward zero" nahi — -7//2 = -4 hota hai, -3 nahi!',
          'Confusion: `int("3.5")` seedha error dega, pehle `float("3.5")` phir `int()` karna padega agar whole number chahiye.',
        ],
      },
      {
        id: 'l-02-03',
        title: 'Strings aur String Methods',
        minutes: 9,
        summary: 'Text banao, slice karo, aur format karo.',
        content: [
          'Strings characters ki sequence hoti hain, single, double, ya triple quotes se banti hain. Triple-quoted strings multi-line ho sakti hain.',
          'Strings mein indexing (`s[0]`) aur slicing (`s[1:4]`) chalti hai — Python indices 0 se shuru hote hain, aur negative index end se count karta hai (`s[-1]` last character deta hai).',
          'Useful methods: `.upper()`, `.lower()`, `.strip()`, `.replace()`, `.split()`, `.join()`, `.find()`. Strings immutable hoti hain — methods naya string return karte hain, original ko modify nahi karte.',
          'f-strings modern tareeqa hai strings ke andar expressions daalne ka: `f"Salam, {name}!"` — bohat clean aur readable hai, purane `.format()` se behtar.',
        ],
        examples: [
          { code: 's = "Python Zabardast Hai"\nprint(s[0], s[-1])\nprint(s[0:6])\nprint(s.lower())\nprint(s.replace("Zabardast", "Mast"))', output: 'P e\nPython\npython zabardast hai\nPython Mast Hai' },
          { code: 'name = "Sara"\nscore = 95\nprint(f"{name} ne {score} points liye!")', output: 'Sara ne 95 points liye!' },
          { code: 'words = "a,b,c".split(",")\nprint(words)\nprint("-".join(words))', output: "['a', 'b', 'c']\na-b-c" },
        ],
        keyPoints: [
          'Indexing 0 se shuru hota hai; negative index end se count karta hai',
          'Slicing: `s[start:stop:step]` — stop wala index exclude hota hai',
          'Strings immutable hain; methods naye strings return karte hain',
          'f-strings `f"{expr}"` sabse modern aur recommended tareeqa hai',
        ],
        commonMistakes: [
          'Galti: Sochna ke `.replace()` original string ko change kar deta hai — nahi, tumhe result ko naye variable mein assign karna padega!',
          'Confusion: `s[0:6]` mein index 6 wala character include nahi hota — slicing "stop exclusive" hoti hai.',
          'Quirk: String + number direct add nahi hota (`"Age: " + 25` error dega) — pehle `str(25)` karo ya f-string use karo.',
        ],
      },
      {
        id: 'l-02-04',
        title: 'Booleans aur None',
        minutes: 5,
        summary: 'Truthy values aur Python ka "kuch nahi" concept.',
        content: [
          'bool type ki do values hoti hain: True aur False (capital letter se). Har expression ki "truthiness" check ho sakti hai — 0, 0.0, "" (empty string), [] (empty list), {} (empty dict), aur None sab falsy hote hain; baaki almost sab truthy hote hain.',
          'None Python ka "koi value nahi" concept hai — dusri languages ke null jesa. Ye default/placeholder value ke tor pe bohat use hota hai.',
          'Comparison operators (`==`, `!=`, `<`, `>`, `<=`, `>=`) aur logical operators (`and`, `or`, `not`) booleans return karte hain, jo conditionals mein bohat use hote hain.',
        ],
        examples: [
          { code: 'print(bool(0), bool(1), bool(""), bool("hi"))\nprint(5 > 3 and 2 < 4)\nprint(not True)', output: 'False True False True\nTrue\nFalse' },
          { code: 'result = None\nprint(result is None)', output: 'True' },
        ],
        keyPoints: [
          'True aur False capitalized keywords hain',
          '0, "", [], {}, aur None falsy hain; baaki mostly truthy',
          'None check karne ke liye `is None` use karo, `== None` nahi',
          '`and` / `or` / `not` boolean expressions combine karte hain',
        ],
        commonMistakes: [
          'Galti: `if x == None:` likhna — ye kaam to karega lekin Pythonic tareeqa `if x is None:` hai, kyunki `is` identity check karta hai.',
          'Quirk: `bool([0])` True hai! Kyunki list mein ek element hai (chahe wo 0 ho), sirf empty list `[]` falsy hoti hai.',
          'Confusion: `"False"` (string) truthy hai, kyunki non-empty string hamesha truthy hoti hai — sirf literal `False` falsy hai.',
        ],
      },
      {
        id: 'l-02-05',
        title: 'Type Conversion aur User Input',
        minutes: 6,
        summary: 'User se input lo aur types ke beech convert karo.',
        content: [
          '`input()` user se ek line text leta hai aur hamesha string return karta hai — agar number chahiye to `int()` ya `float()` se convert karna zaroori hai.',
          'Implicit conversion khud-ba-khud hoti hai kabhi kabhi (jese int + float = float). Explicit conversion (casting) manually `int()`, `float()`, `str()`, `bool()`, `list()` se hoti hai.',
          'Ek cheez dhyan rakhna: `int("abc")` ValueError de gi. Hamesha user input validate karo ya try/except use karo (Error Handling module mein detail se seekhenge).',
        ],
        examples: [
          { code: 'age_str = input("Apni age batao: ")\nage = int(age_str)\nprint(f"Agle saal tum {age + 1} ke ho jaoge")', output: 'Apni age batao: 20\nAgle saal tum 21 ke ho jaoge' },
          { code: 'print(int("42") + 8)\nprint(str(3.14) + " pi hai")', output: '50\n3.14 pi hai' },
        ],
        keyPoints: [
          '`input()` hamesha string return karta hai',
          'User input ko number banane ke liye `int()`/`float()` use karo',
          '`str()` kisi bhi value ko string representation mein convert karta hai',
          'Invalid conversion pe ValueError aata hai',
        ],
        commonMistakes: [
          'Galti: `input()` se aayi value ko seedha math mein use karna (jese `input() + 5`) — pehle `int()` ya `float()` se convert karna zaroori hai.',
          'Confusion: `int("3.5")` error dega, kyunki string mein decimal point hai — pehle `float("3.5")` phir chaho to `int()`.',
          'Quirk: Empty input (`input()` mein user kuch na likhe) empty string "" return karta hai, jo `int()` mein crash kar dega — validation lagao.',
        ],
      },
    ],
    quiz: [
      { id: 'q-02-1', question: '7 // 2 ka result kya hoga?', options: ['3.5', '3', '4', '1'], correctIndex: 1, explanation: '// floor division hai, remainder chhod deta hai: 3.' },
      { id: 'q-02-2', question: 'In mein se kaunsi value falsy hai?', options: ['"False"', '1', '[]', '"0"'], correctIndex: 2, explanation: 'Empty list [] falsy hai. Non-empty strings, "False" aur "0" sameet, truthy hoti hain.' },
      { id: 'q-02-3', question: '`input()` kya return karta hai?', options: ['Integer', 'String', 'Boolean', 'Depends on input'], correctIndex: 1, explanation: 'input() hamesha string return karta hai, jo bhi type ho.' },
      { id: 'q-02-4', question: 's = "hello" ke liye s[-1] kya hai?', options: ['h', 'o', 'Error', 'Empty string'], correctIndex: 1, explanation: 'Negative index end se count karta hai, -1 last character "o" hai.' },
      { id: 'q-02-5', question: 'Sahi f-string syntax kya hai?', options: ['f"Hello {name}"', '"Hello %name%"', 'f"Hello ${name}"', 'format("Hello {name}")'], correctIndex: 0, explanation: 'f-strings f"..." mein {expression} placeholders use karti hain.' },
    ],
  },
  {
    id: 'mod-03',
    order: 3,
    title: 'Collections — Data Ko Organize Karna',
    subtitle: 'Lists, tuples, sets aur dictionaries',
    icon: 'layers-outline',
    color: moduleColors[2],
    lessons: [
      {
        id: 'l-03-01',
        title: 'Lists: Ordered aur Mutable',
        minutes: 8,
        summary: 'Python ka sabse versatile collection type.',
        content: [
          'List ek ordered, mutable collection hoti hai jo square brackets se banti hai: `[1, 2, 3]`. Lists mixed types rakh sakti hain aur nested bhi ho sakti hain (list ke andar list).',
          'Common operations: `.append()` end mein add karta hai, `.insert()` kisi specific index pe add karta hai, `.remove()` value se delete karta hai, `.pop()` index se remove karta hai (aur wo value return bhi karta hai), aur `.sort()`/`sorted()` order karte hain.',
          'Lists mein strings ki tarah slicing chalti hai, aur `len()` se elements ki ginti pata chalti hai. List comprehensions (aage seekhenge) lists banane ka bohat concise tareeqa hain.',
        ],
        examples: [
          { code: 'fruits = ["seb", "kela"]\nfruits.append("cherry")\nfruits.insert(1, "kiwi")\nprint(fruits)\nprint(len(fruits))', output: "['seb', 'kiwi', 'kela', 'cherry']\n4" },
          { code: 'nums = [5, 3, 8, 1]\nnums.sort()\nprint(nums)\nprint(nums[::-1])  # reverse ho gaya', output: '[1, 3, 5, 8]\n[8, 5, 3, 1]' },
        ],
        keyPoints: [
          'Lists ordered, mutable hoti hain aur duplicates allow karti hain',
          '`.append()`, `.insert()`, `.remove()`, `.pop()` list ko in-place modify karte hain',
          '`[::-1]` slicing se list reverse ho jati hai',
          '`sorted(list)` naya sorted list deta hai; `list.sort()` original ko hi sort karta hai',
        ],
        commonMistakes: [
          'Galti: `list1 = list2` likh kar sochna copy ban gayi — nahi! Ye sirf reference copy karta hai, dono variables same list ko point karte hain. Copy chahiye to `.copy()` ya `list(list2)` use karo.',
          'Quirk: Empty index pe `.pop()` call karna (empty list pe) IndexError deta hai — pehle check karo list khali to nahi.',
          'Confusion: `.sort()` list ko in-place sort karta hai aur `None` return karta hai — `x = list.sort()` likhoge to `x` None ban jayega, list nahi!',
        ],
      },
      {
        id: 'l-03-02',
        title: 'Tuples: Ordered aur Immutable',
        minutes: 5,
        summary: 'Fixed collections jo constant data ke liye perfect hain.',
        content: [
          'Tuple list jesi hoti hai lekin immutable — ek dafa ban gayi to change nahi ho sakti. Parentheses se banti hai: `(1, 2, 3)`, ya bina bhi: `1, 2, 3`.',
          'Tuples lists se fast hote hain aur fixed collections ke liye use hote hain, jese coordinates `(x, y)` ya database records.',
          'Immutable hone ki waja se tuples dictionary keys aur set elements ban sakte hain, jabke lists nahi ban sakti.',
        ],
        examples: [
          { code: 'point = (3, 4)\nx, y = point  # unpacking\nprint(x, y)\nprint(point[0])', output: '3 4\n3' },
          { code: 'coords = {(0,0): "origin", (1,1): "diagonal"}\nprint(coords[(0,0)])', output: 'origin' },
        ],
        keyPoints: [
          'Tuples `()` se bante hain aur banne ke baad modify nahi ho sakte',
          'Tuple unpacking: `x, y = point`',
          'Tuples dictionary keys ban sakte hain; lists nahi ban sakti',
          'Single-element tuple ke liye trailing comma zaroori hai: `(5,)`',
        ],
        commonMistakes: [
          'Galti: `(5)` likh kar sochna ye tuple hai — nahi, ye sirf integer 5 hai! Single tuple ke liye comma zaroori: `(5,)`.',
          'Confusion: Tuple immutable hai lekin agar us mein list ho (jese `([1,2], 3)`), to us list ke andar ke elements change ho sakte hain — sirf tuple ka structure fix hai.',
          'Quirk: `tuple.append()` jesa method exist hi nahi karta, kyunki tuples modify nahi ho sakte — TypeError milega.',
        ],
      },
      {
        id: 'l-03-03',
        title: 'Dictionaries: Key-Value Pairs',
        minutes: 8,
        summary: 'Key se fast lookup — Python data ka asli hero.',
        content: [
          'Dictionary (dict) key-value pairs store karta hai curly braces se: `{"name": "Ali", "age": 22}`. Keys unique aur immutable honi chahiye (strings, numbers, tuples).',
          'Values access karne ke liye `dict[key]` ya safer `.get(key, default)` use karo. Add/update karne ke liye `dict[key] = value`, remove ke liye `del dict[key]` ya `.pop(key)`.',
          'Python 3.7 se dictionaries insertion order preserve karti hain. Iterate karne ke liye `.keys()`, `.values()`, aur `.items()` use hote hain.',
        ],
        examples: [
          { code: 'person = {"name": "Ali", "age": 22}\nperson["city"] = "Lahore"\nprint(person)\nprint(person.get("job", "Bekaar"))', output: "{'name': 'Ali', 'age': 22, 'city': 'Lahore'}\nBekaar" },
          { code: 'scores = {"Sara": 90, "Umar": 85}\nfor name, score in scores.items():\n    print(f"{name}: {score}")', output: 'Sara: 90\nUmar: 85' },
        ],
        keyPoints: [
          'Dictionaries unique keys ko values se map karte hain: `{key: value}`',
          '`.get(key, default)` missing key pe KeyError se bacha leta hai',
          '`.items()` iteration ke liye (key, value) pairs deta hai',
          'Dicts Python 3.7 se insertion order preserve karti hain',
        ],
        commonMistakes: [
          'Galti: `dict[key]` use karna jab key exist nahi karti — seedha KeyError crash ho jata hai. `.get()` use karo agar key ki guarantee nahi.',
          'Quirk: List ko dictionary key nahi bana sakte (mutable hai) — TypeError "unhashable type" milega. Tuple use karo agar composite key chahiye.',
          'Confusion: `for key in dict:` sirf keys deta hai, values nahi — values chahiye to `.values()` ya `.items()` use karo.',
        ],
      },
      {
        id: 'l-03-04',
        title: 'Sets: Unique aur Unordered',
        minutes: 6,
        summary: 'Duplicates remove karo aur set math karo.',
        content: [
          'Set ek unordered collection hai jisme sirf unique elements hote hain, curly braces ya `set()` se banta hai. Duplicates automatically remove ho jate hain.',
          'Sets mathematical operations support karte hain: union (`|`), intersection (`&`), difference (`-`), aur symmetric difference (`^`) — do groups compare karne ke liye zabardast hai.',
          '`.add()` se element insert hota hai aur `.remove()`/`.discard()` se delete. Sets `in` operator se fast membership testing ke liye ideal hain.',
        ],
        examples: [
          { code: 'a = {1, 2, 3}\nb = {3, 4, 5}\nprint(a | b)  # union\nprint(a & b)  # intersection\nprint(a - b)  # difference', output: '{1, 2, 3, 4, 5}\n{3}\n{1, 2}' },
          { code: 'nums = [1, 2, 2, 3, 3, 3]\nunique = set(nums)\nprint(unique)', output: '{1, 2, 3}' },
        ],
        keyPoints: [
          'Sets mein sirf unique, unordered elements hote hain',
          '`|` union, `&` intersection, `-` difference, `^` symmetric difference',
          '`set(list)` se quickly list ke duplicates remove ho jate hain',
          '`in` membership test sets pe bohat fast chalta hai',
        ],
        commonMistakes: [
          'Galti: Empty set banane ke liye `{}` likhna — ye actually empty dictionary ban jati hai! Empty set ke liye `set()` likho.',
          'Quirk: Sets order preserve nahi karte, to `set[0]` jesi indexing nahi chal sakti — TypeError milega.',
          'Confusion: List ko set mein daalne se order lost ho sakta hai — agar order zaroori hai to `dict.fromkeys(list)` use karo (Python 3.7+ mein order preserve karta hai).',
        ],
      },
      {
        id: 'l-03-05',
        title: 'List, Dict aur Set Comprehensions',
        minutes: 7,
        summary: 'Ek hi line mein elegant tareeqe se collections banao.',
        content: [
          'List comprehension ek line mein iterable se list banata hai: `[expression for item in iterable if condition]`. Ye zyada Pythonic hai aur manual loop + append() se aksar fast bhi hota hai.',
          'Ye hi pattern dictionaries `{k: v for ...}` aur sets `{expr for ...}` ke liye bhi kaam karta hai, jisse data transform aur filter karna concise ho jata hai.',
          'Comprehensions nested bhi ho sakte hain multi-dimensional data ke liye, lekin readability ka khayal rakho — agar bohat complex ho jaye to normal loop hi behtar hai.',
        ],
        examples: [
          { code: 'squares = [x**2 for x in range(6)]\nprint(squares)\nevens = [x for x in range(10) if x % 2 == 0]\nprint(evens)', output: '[0, 1, 4, 9, 16, 25]\n[0, 2, 4, 6, 8]' },
          { code: 'words = ["hi", "python", "ok"]\nlengths = {w: len(w) for w in words}\nprint(lengths)', output: "{'hi': 2, 'python': 6, 'ok': 2}" },
        ],
        keyPoints: [
          'List comprehension: `[expr for item in iterable if cond]`',
          'Dict comprehension: `{k: v for item in iterable}`',
          'Comprehensions concise hote hain aur aksar manual loops se fast',
          'Zyada nested comprehensions readability kharab kar dete hain — avoid karo',
        ],
        commonMistakes: [
          'Galti: Comprehension ke andar side-effects (jese print) daal dena — ye anti-pattern hai, comprehension sirf value banane ke liye hai.',
          'Confusion: `if` aur `if-else` comprehension mein alag jagah aate hain — filter wala `if` end mein, value-choosing wala `if-else` expression ke start mein: `[x if x>0 else 0 for x in nums]`.',
          'Quirk: Bohat bara comprehension ek line mein likh dena readability kharab kar deta hai — agar 2-3 nested loops hon to normal for-loop likhna behtar hai.',
        ],
      },
    ],
    quiz: [
      { id: 'q-03-1', question: 'Kaunsa collection type immutable hai?', options: ['list', 'dict', 'tuple', 'set'], correctIndex: 2, explanation: 'Tuples banne ke baad modify nahi ho sakte.' },
      { id: 'q-03-2', question: 'Agar "x" key na mile to dict.get("x", 0) kya karega?', options: ['Error dega', 'None return karega', '0 return karega', '"x" return karega'], correctIndex: 2, explanation: '.get() default value (0) return karta hai, KeyError ki jaga.' },
      { id: 'q-03-3', question: '{1,2,2,3} ka result kya hoga?', options: ['{1,2,2,3}', '{1,2,3}', 'Error', '[1,2,3]'], correctIndex: 1, explanation: 'Sets duplicates automatically remove kar dete hain, sirf unique elements rehte hain.' },
      { id: 'q-03-4', question: '[x*2 for x in range(3)] kya produce karega?', options: ['[0,1,2]', '[0,2,4]', '[2,4,6]', '[0,2,4,6]'], correctIndex: 1, explanation: 'range(3) 0,1,2 deta hai, har ek ko double kar ke [0,2,4] milta hai.' },
      { id: 'q-03-5', question: 'Do sets ka intersection kaunsa operator deta hai?', options: ['+', '&', '|', '^'], correctIndex: 1, explanation: '& un elements ko return karta hai jo dono sets mein maujood hain.' },
    ],
  },
  {
    id: 'mod-04',
    order: 4,
    title: 'Control Flow — Faisla Karna',
    subtitle: 'Conditionals aur decision making',
    icon: 'git-branch-outline',
    color: moduleColors[3],
    lessons: [
      {
        id: 'l-04-01',
        title: 'if, elif, else — Faisle Ka Structure',
        minutes: 7,
        summary: 'Condition ke hisab se apna program branch karo.',
        content: [
          'if statement tab hi chalta hai jab condition True ho. elif (else-if) additional conditions check karta hai, aur else baaki sab cases catch kar leta hai.',
          'Conditions upar se neeche evaluate hoti hain; jo pehla True branch mile wahi chalta hai, baaki skip ho jate hain. Indentation (4 spaces) har block ka scope define karta hai.',
          'Conditionals nested bhi ho sakte hain, aur comparison/logical operators se complex conditions bana sakte ho.',
        ],
        examples: [
          { code: 'age = 20\nif age < 13:\n    print("Bachpan")\nelif age < 20:\n    print("Teenager")\nelse:\n    print("Bara ho gaya")', output: 'Bara ho gaya' },
        ],
        keyPoints: [
          'if/elif/else mein sirf pehla matching branch chalta hai',
          'Indentation har block ka scope define karta hai',
          '`and` / `or` / `not` se conditions combine hoti hain',
          'Sirf if bhi likha ja sakta hai, else zaroori nahi',
        ],
        commonMistakes: [
          'Galti: Colon `:` bhool jana if/elif/else ke aakhir mein — Python SyntaxError dega.',
          'Confusion: `elif` ko `else if` samajh kar do separate words likh dena — Python mein ek hi word "elif" hai.',
          'Quirk: `if x = 5:` likhna (assignment operator galti se) — comparison ke liye `==` chahiye, warna SyntaxError aayega.',
        ],
      },
      {
        id: 'l-04-02',
        title: 'Comparison aur Logical Operators',
        minutes: 6,
        summary: 'Precise conditional expressions banao.',
        content: [
          'Comparison operators: `==` (barabar), `!=` (barabar nahi), `<`, `>`, `<=`, `>=`. Ye booleans return karte hain aur chain ho sakte hain: `0 < x < 10` dono limits ek sath check karta hai.',
          'Logical operators booleans combine karte hain: `and` (dono true), `or` (koi bhi ek true), `not` (invert karta hai). Python short-circuit karta hai: `a and b` mein, b sirf tab evaluate hota hai jab a True ho.',
          '`in` operator membership check karta hai strings, lists, dicts (keys check karta hai), aur sets mein — conditionals mein bohat kaam ka hai.',
        ],
        examples: [
          { code: 'x = 7\nprint(0 < x < 10)\nprint("py" in "python")\nprint(5 in [1,2,3])', output: 'True\nTrue\nFalse' },
        ],
        keyPoints: [
          'Chained comparisons jese `0 < x < 10` valid Python hain',
          'and/or short-circuit evaluation karte hain, efficiency ke liye',
          '`in` strings, lists, dicts, sets sab mein membership check karta hai',
          '`not` boolean value ko invert kar deta hai',
        ],
        commonMistakes: [
          'Galti: `=` aur `==` mein confuse hona — `=` assignment hai, `==` comparison hai. If statements mein hamesha `==` chahiye.',
          'Quirk: `and`/`or` value return karte hain (boolean nahi zaroori) — `5 and 10` result "10" deta hai, ye Python ki special behavior hai.',
          'Confusion: `x == True` likhna jab `if x:` hi kaafi hai — redundant aur non-Pythonic style hai.',
        ],
      },
      {
        id: 'l-04-03',
        title: 'Match Statements (Python 3.10+)',
        minutes: 6,
        summary: "Python ka switch statement — structural pattern matching.",
        content: [
          'Python 3.10 mein match/case aaya, jo structural pattern matching provide karta hai — dusri languages ke switch se similar lekin zyada powerful.',
          'Har case ek literal value, pattern match kar sakta hai, ya `_` wildcard/default case use kar sakta hai jo hamesha match hota hai.',
          'match structured data (lists, dicts, objects) ko destructure bhi kar sakta hai, jo complex data parse karne ke liye kaafi clean approach hai.',
        ],
        examples: [
          { code: 'def describe(status):\n    match status:\n        case 200:\n            return "OK"\n        case 404:\n            return "Nahi Mila"\n        case _:\n            return "Pata nahi"\n\nprint(describe(404))', output: 'Nahi Mila' },
        ],
        keyPoints: [
          'match/case Python 3.10 ya newer version mein chalta hai',
          '`case _:` wildcard/default branch hai',
          'Literals, types, aur structured patterns match kar sakta hai',
          'Long if/elif chains se zyada expressive hai value matching ke liye',
        ],
        commonMistakes: [
          'Galti: Purani Python versions (3.9 se neeche) mein match use karna — SyntaxError milega, pehle version check karo.',
          'Confusion: `case _:` ko variable samajh kar use karna — `_` sirf wildcard hai, agar koi variable capture karna hai to alag naam do.',
          'Quirk: match statement mein cases upar se neeche check hote hain, jese if/elif — pehla match milte hi baaki skip ho jate hain.',
        ],
      },
    ],
    quiz: [
      { id: 'q-04-1', question: 'Agar if/elif chain mein koi condition True na ho (aur else ho) to kya chalega?', options: ['Kuch nahi', 'else block', 'Pehla if block', 'Error'], correctIndex: 1, explanation: 'else block fallback ke tor pe chalta hai jab koi condition match na ho.' },
      { id: 'q-04-2', question: '0 < x < 10 ka Python mein kya matlab hai?', options: ['Syntax error', '(0 < x) < 10', '0 < x and x < 10', 'x < 10'], correctIndex: 2, explanation: 'Python chained comparisons support karta hai, and ke equivalent.' },
      { id: 'q-04-3', question: 'match statement mein wildcard case kaunsa keyword hai?', options: ['default', 'else', '_', '*'], correctIndex: 2, explanation: 'Underscore _ har cheez ko default case ki tarah match karta hai.' },
      { id: 'q-04-4', question: '"py" in "python" ka result kya hai?', options: ['True', 'False', 'Error', '"py"'], correctIndex: 0, explanation: '"py" "python" ka substring hai, to in True return karta hai.' },
    ],
  },
  {
    id: 'mod-05',
    order: 5,
    title: 'Loops — Baar Baar Kaam Karna',
    subtitle: 'Actions ko efficiently repeat karna',
    icon: 'repeat-outline',
    color: moduleColors[4],
    lessons: [
      {
        id: 'l-05-01',
        title: 'for Loops aur range()',
        minutes: 7,
        summary: 'Sequences aur number ranges pe iterate karna.',
        content: [
          'for loop kisi bhi iterable pe iterate karta hai — strings, lists, tuples, dicts, sets, ya ranges. `range(start, stop, step)` numbers ki sequence generate karta hai (lazily, memory bachate hue).',
          '`range(5)` 0,1,2,3,4 deta hai (stop exclusive hota hai). `range(2, 10, 2)` 2,4,6,8 deta hai. Negative step se count neeche bhi ho sakta hai.',
          '`enumerate()` loop mein index aur value dono deta hai — manually counter track karne se zyada Pythonic hai.',
        ],
        examples: [
          { code: 'for i in range(5):\n    print(i, end=" ")', output: '0 1 2 3 4' },
          { code: 'fruits = ["seb", "kela", "cherry"]\nfor i, fruit in enumerate(fruits):\n    print(i, fruit)', output: '0 seb\n1 kela\n2 cherry' },
        ],
        keyPoints: [
          '`range(stop)`, `range(start, stop)`, `range(start, stop, step)`',
          '`range()` ka stop value exclusive hota hai',
          'for loop kisi bhi iterable pe direct chal jata hai',
          '`enumerate()` har item ko uske index ke sath pair karta hai',
        ],
        commonMistakes: [
          'Galti: `range(1, 10)` mein sochna 10 bhi include hoga — nahi, stop hamesha exclusive hai, sirf 1 se 9 tak milta hai.',
          'Confusion: `for i in range(len(list)):` likh kar phir `list[i]` use karna — jab enumerate() se seedha value bhi mil sakti hai, code lamba ho jata hai.',
          'Quirk: Loop ke andar loop variable ko modify karna (jese `i = i + 5`) range() sequence ko affect nahi karta — range apna hisab se chalta rehta hai.',
        ],
      },
      {
        id: 'l-05-02',
        title: 'while Loops',
        minutes: 6,
        summary: 'Jab tak condition true rahe, repeat karo.',
        content: [
          'while loop tab tak repeat hota hai jab tak uski condition True rahe. Ye ideal hai jab pehle se pata na ho kitni iterations chahiye.',
          'Hamesha ensure karo loop condition eventually False ho jaye, warna infinite loop ban jayega (ek common bug — Ctrl+C se rukwa sakte ho runaway script ko).',
          '`while True:` ke andar `break` bohat common pattern hai "jab tak koi specific event na ho" wale scenarios ke liye, jese valid user input ka wait karna.',
        ],
        examples: [
          { code: 'count = 0\nwhile count < 3:\n    print("Counting:", count)\n    count += 1', output: 'Counting: 0\nCounting: 1\nCounting: 2' },
          { code: 'n = 10\nwhile n > 0:\n    n -= 3\nprint(n)', output: '-2' },
        ],
        keyPoints: [
          'while tab tak chalta hai jab tak condition True hai',
          'Loop variable ko update karna zaroori hai, warna infinite loop banega',
          '`while True:` + `break` "event tak loop karo" pattern ke liye kaam ata hai',
          '`+=` shorthand hai `x = x + value` ke liye',
        ],
        commonMistakes: [
          'Galti: Loop variable update karna bhool jana (jese `count += 1`) — infinite loop ban jata hai jo hang ho jayega.',
          'Quirk: `while True:` bina break ke likhna — program kabhi khatam nahi hoga, hamesha exit condition rakho.',
          'Confusion: for-loop use karna chahiye tha (fixed number of iterations) lekin while use kar liya — agar count pata hai to for loop cleaner hota hai.',
        ],
      },
      {
        id: 'l-05-03',
        title: 'break, continue, aur Loop ka else',
        minutes: 6,
        summary: 'Loop execution ko fine-tune karo.',
        content: [
          '`break` turant nearest enclosing loop se bahar nikal jata hai. `continue` current iteration ka baaki hissa skip kar ke next iteration pe chala jata hai.',
          'Ek kam-jaani feature: loops (for/while) ka `else` clause bhi ho sakta hai jo tab hi chalta hai jab loop bina break ke complete ho — search patterns ke liye useful hai.',
          'In control statements se code deep nested conditionals se zyada clean likha ja sakta hai.',
        ],
        examples: [
          { code: 'for n in range(10):\n    if n == 5:\n        break\n    print(n, end=" ")', output: '0 1 2 3 4' },
          { code: 'for n in range(6):\n    if n % 2 == 0:\n        continue\n    print(n, end=" ")', output: '1 3 5' },
          { code: 'for n in [1,3,5]:\n    if n % 2 == 0:\n        break\nelse:\n    print("Sab odd numbers hain!")', output: 'Sab odd numbers hain!' },
        ],
        keyPoints: [
          '`break` loop se poori tarah exit ho jata hai',
          '`continue` next iteration pe chala jata hai',
          'Loop ka `else` sirf tab chalta hai jab break na aaya ho',
          'Ye extra flag variables ki zaroorat kam kar dete hain',
        ],
        commonMistakes: [
          'Galti: Nested loop mein `break` likhna aur sochna sab loops se nikal jayega — nahi, sirf innermost loop se nikalta hai.',
          'Confusion: `continue` ko `break` samajh lena — continue sirf current iteration skip karta hai, loop khatam nahi karta.',
          'Quirk: Loop ka `else` "loop khatam hone ke baad hamesha chalega" nahi hai — sirf tab chalta hai jab break nahi aaya.',
        ],
      },
      {
        id: 'l-05-04',
        title: 'Nested Loops aur Loop Patterns',
        minutes: 6,
        summary: 'Grids aur matrices ke liye loop ke andar loop.',
        content: [
          'Nested loop ek loop hoti hai dusri loop ke andar — 2D grids, matrices, aur combinations generate karne ke liye common use case hai.',
          'Inner loop apni saari iterations complete karta hai outer loop ki har ek iteration ke liye. Performance ka khayal rakho: nested loops complexity multiply kar dete hain (O(n*m)).',
          '`zip()` se multiple iterables ko parallel mein iterate kar sakte ho bina index ke — aksar nested loop se cleaner hota hai.',
        ],
        examples: [
          { code: 'for i in range(1, 4):\n    for j in range(1, 4):\n        print(f"{i}x{j}={i*j}", end="  ")\n    print()', output: '1x1=1  1x2=2  1x3=3  \n2x1=2  2x2=4  2x3=6  \n3x1=3  3x2=6  3x3=9  ' },
          { code: 'names = ["Ali", "Sara"]\nages = [22, 20]\nfor name, age in zip(names, ages):\n    print(name, age)', output: 'Ali 22\nSara 20' },
        ],
        keyPoints: [
          'Nested loops: outer ki har iteration ke liye inner poori chalti hai',
          'Grids, matrices, multiplication tables ke liye best hai',
          '`zip()` multiple iterables ko manual indexing ke bina pair karta hai',
          'Bade nested loops mein O(n*m) performance ka khayal rakho',
        ],
        commonMistakes: [
          'Galti: Inner loop ka variable outer wale se same naam rakhna (jese dono `i`) — confusion ho jati hai kaunsa loop kis variable ko use kar raha hai.',
          'Quirk: `zip()` sabse chhoti list ki length tak hi chalta hai — agar lists ki length different hai to extra elements ignore ho jayenge.',
          'Confusion: 3-4 nested loops likh dena jab better data structure ya algorithm se kaam chal sakta ho — performance bohat slow ho jati hai bade data pe.',
        ],
      },
    ],
    quiz: [
      { id: 'q-05-1', question: 'range(2, 10, 2) kya generate karega?', options: ['2,4,6,8,10', '2,4,6,8', '2,3,4,...,9', '0,2,4,6,8'], correctIndex: 1, explanation: 'Stop (10) exclusive hai, isliye 2,4,6,8 milta hai.' },
      { id: 'q-05-2', question: 'Loop ke andar `continue` kya karta hai?', options: ['Loop se exit karta hai', 'Next iteration pe jata hai', 'Program restart karta hai', 'Loop ko pause karta hai'], correctIndex: 1, explanation: 'continue baaki code skip kar ke next iteration pe chala jata hai.' },
      { id: 'q-05-3', question: 'Loop ka else clause kab chalta hai?', options: ['Hamesha loop ke baad', 'Sirf agar break aaya ho', 'Sirf agar break NA aaya ho', 'Kabhi nahi'], correctIndex: 2, explanation: 'else sirf tab chalta hai jab loop bina break ke complete ho.' },
      { id: 'q-05-4', question: 'Loop mein index aur value dono kaunsa function deta hai?', options: ['zip()', 'enumerate()', 'range()', 'index()'], correctIndex: 1, explanation: 'enumerate() (index, value) pairs yield karta hai.' },
    ],
  },
  {
    id: 'mod-06',
    order: 6,
    title: 'Functions — Reusable Code',
    subtitle: 'Organized aur reusable code blocks',
    icon: 'code-slash-outline',
    color: moduleColors[5],
    lessons: [
      {
        id: 'l-06-01',
        title: 'Functions Define aur Call Karna',
        minutes: 7,
        summary: '`def` keyword aur return values ka use.',
        content: [
          'Functions reusable logic ko bundle karte hain. `def name(parameters):` se function define hota hai, phir indented body aati hai. `return` se caller ko value wapas bheji jati hai.',
          'Agar function mein `return` na ho to wo automatically `None` return kar deta hai. Functions multiple values bhi return kar sakte hain, tuple ki shakal mein.',
          'Parameters ki default values ho sakti hain (`def greet(name="Dunya")`), jo unhe call karte waqt optional bana deti hain.',
        ],
        examples: [
          { code: 'def add(a, b):\n    return a + b\n\nprint(add(3, 4))', output: '7' },
          { code: 'def stats(nums):\n    return min(nums), max(nums), sum(nums)\n\nlo, hi, total = stats([3, 7, 2])\nprint(lo, hi, total)', output: '2 7 12' },
          { code: 'def greet(name="Dunya"):\n    print(f"Salam, {name}!")\n\ngreet()\ngreet("Python")', output: 'Salam, Dunya!\nSalam, Python!' },
        ],
        keyPoints: [
          '`def name(params):` se function define hota hai',
          '`return` value wapas bhejta hai; na ho to `None` return hota hai',
          'Functions multiple values ko tuple ki tarah return kar sakte hain',
          'Default parameter values arguments ko optional bana dete hain',
        ],
        commonMistakes: [
          'Galti: Function ke andar `print()` use karna jab actually `return` chahiye tha — print sirf dikhata hai, return value further use ke liye deta hai.',
          'Quirk: Default parameter mutable object (jese list) rakhna — `def f(x=[]):` — ye ek famous Python trap hai, list saari calls ke beech share ho jati hai!',
          'Confusion: Function call karna bhool jana (sirf `greet` likhna, `greet()` nahi) — is se function object print hota hai, uska result nahi.',
        ],
      },
      {
        id: 'l-06-02',
        title: 'Arguments: *args aur **kwargs',
        minutes: 8,
        summary: 'Variable number of arguments handle karo.',
        content: [
          '`*args` kisi bhi tadaad ke positional arguments ko tuple mein collect kar leta hai function ke andar. `**kwargs` keyword arguments ko dictionary mein collect karta hai.',
          'Function calls mein `*` aur `**` se list/dict ko unpack bhi kar sakte ho individual arguments mein — reverse operation.',
          'Keyword-only arguments (signature mein akela `*` ke baad) callers ko force karte hain `name=value` use karne pe, jo bohat parameters wale functions mein clarity deta hai.',
        ],
        examples: [
          { code: 'def total(*args):\n    return sum(args)\n\nprint(total(1, 2, 3, 4))', output: '10' },
          { code: 'def profile(**kwargs):\n    for k, v in kwargs.items():\n        print(f"{k}: {v}")\n\nprofile(name="Ana", age=28)', output: 'name: Ana\nage: 28' },
          { code: 'nums = [1, 2, 3]\nprint(total(*nums))  # list unpack ho rahi hai', output: '6' },
        ],
        keyPoints: [
          '`*args` extra positional args ko tuple mein collect karta hai',
          '`**kwargs` extra keyword args ko dict mein collect karta hai',
          '`*list` / `**dict` collections ko function call mein unpack karte hain',
          '`*` ke baad keyword-only args call-site clarity improve karte hain',
        ],
        commonMistakes: [
          'Galti: `*args` aur `**kwargs` ka order galat rakhna function signature mein — hamesha normal params, phir *args, phir **kwargs is order mein aana chahiye.',
          'Confusion: `*args` ko list samajhna — actually ye tuple hai, `.append()` jesa list method nahi chalega.',
          'Quirk: `**kwargs` mein keys hamesha strings honi chahiye — number ya dusra type key nahi ban sakta.',
        ],
      },
      {
        id: 'l-06-03',
        title: 'Scope: Local vs Global',
        minutes: 6,
        summary: 'Samjho variables kahan "rehte" hain.',
        content: [
          'Function ke andar define hone wale variables local hote hain — sirf usi call ke dauran exist karte hain, phir gayab ho jate hain. Function ke bahar define hone wale global hote hain.',
          'Functions global variables ko read kar sakte hain lekin modify karne ke liye `global` keyword chahiye. Zyada globals use karna discourage kiya jata hai — behtar hai parameters pass karo aur results return karo.',
          'Python names resolve karne ke liye LEGB rule use karta hai: Local, Enclosing, Global, Built-in — is hi order mein check hota hai.',
        ],
        examples: [
          { code: 'count = 0\n\ndef increment():\n    global count\n    count += 1\n\nincrement()\nincrement()\nprint(count)', output: '2' },
          { code: 'def outer():\n    x = "bahar wala"\n    def inner():\n        print(x)  # enclosing scope se read ho raha hai\n    inner()\n\nouter()', output: 'bahar wala' },
        ],
        keyPoints: [
          'Local variables sirf apni function call ke dauran exist karte hain',
          '`global` keyword se function ke andar global variable modify ho sakta hai',
          'LEGB: Local, Enclosing, Global, Built-in — name resolution order',
          'Jahan mumkin ho, parameters/return values ko globals se better samjho',
        ],
        commonMistakes: [
          'Galti: `global` keyword use kiye bina function ke andar global variable modify karne ki koshish karna — Python naya local variable bana deta hai, error milta hai "referenced before assignment".',
          'Confusion: Har cheez ke liye global variables use karna — code samajhna mushkil ho jata hai, aur bugs track karna hard ho jata hai.',
          'Quirk: Function ke andar sirf read karna ho (modify nahi) to `global` keyword ki zaroorat nahi — Python khud outer scope check kar leta hai.',
        ],
      },
      {
        id: 'l-06-04',
        title: 'Lambda Functions aur Higher-Order Functions',
        minutes: 7,
        summary: 'Anonymous functions aur functional patterns.',
        content: [
          'Lambda ek chhota anonymous function hota hai: `lambda x: x * 2`. Short, throwaway functions ke liye useful jo arguments ki tarah pass hote hain.',
          'Higher-order functions dusre functions ko arguments ki tarah lete hain. `map(func, iterable)` har item pe function apply karta hai; `filter(func, iterable)` sirf wo items rakhta hai jahan func True return kare; `sorted(iterable, key=func)` sort order customize karta hai.',
          'Lambdas handy hain lekin agar logic complex ya reused ho to named `def` function use karo — readability brevity se zyada important hai.',
        ],
        examples: [
          { code: 'square = lambda x: x ** 2\nprint(square(5))', output: '25' },
          { code: 'nums = [1, 2, 3, 4, 5]\ndoubled = list(map(lambda x: x*2, nums))\nevens = list(filter(lambda x: x%2==0, nums))\nprint(doubled)\nprint(evens)', output: '[2, 4, 6, 8, 10]\n[2, 4]' },
          { code: 'people = [("Bilal", 25), ("Amna", 30)]\nsorted_people = sorted(people, key=lambda p: p[0])\nprint(sorted_people)', output: "[('Amna', 30), ('Bilal', 25)]" },
        ],
        keyPoints: [
          '`lambda args: expression` anonymous function banata hai',
          '`map()` transform karta hai, `filter()` select karta hai, `sorted(key=)` order customize karta hai',
          'Lambdas simple honi chahiye — complex logic ke liye `def` use karo',
          'Higher-order functions dusre functions accept ya return karte hain',
        ],
        commonMistakes: [
          'Galti: Lambda mein multiple statements likhne ki koshish karna — lambda sirf ek expression allow karta hai, statement nahi (jese if/for direct nahi likh sakte).',
          'Confusion: `sorted(list, key=func)` mein `func` ko call kar dena (`key=func()`) — key parameter ko function reference milna chahiye, uska result nahi.',
          'Quirk: Lambda ko variable mein assign kar ke bar bar use karna theek hai, lekin PEP 8 recommend karta hai aise cases mein normal `def` function likho, better traceback ke liye.',
        ],
      },
    ],
    quiz: [
      { id: 'q-06-1', question: 'Agar function mein return statement na ho to kya return hota hai?', options: ['0', 'Empty string', 'None', 'Error'], correctIndex: 2, explanation: 'Python implicitly None return karta hai jab return statement na ho.' },
      { id: 'q-06-2', question: '*args kya collect karta hai?', options: ['Keyword args ka dict', 'Positional args ka tuple', 'Default args ki list', 'Kuch nahi, invalid hai'], correctIndex: 1, explanation: '*args extra positional arguments ko tuple mein collect karta hai.' },
      { id: 'q-06-3', question: 'Function ke andar global variable modify karne ke liye kaunsa keyword chahiye?', options: ['nonlocal', 'global', 'static', 'external'], correctIndex: 1, explanation: '`global` keyword function ko global-scope variable assign karne deta hai.' },
      { id: 'q-06-4', question: 'Valid lambda syntax kaunsa hai?', options: ['lambda x: x+1', 'lambda(x): x+1', 'function(x) => x+1', 'def lambda x: x+1'], correctIndex: 0, explanation: '`lambda parameters: expression` sahi syntax hai.' },
    ],
  },
  {
    id: 'mod-07',
    order: 7,
    title: 'Object-Oriented Python',
    subtitle: 'Classes, objects, aur inheritance',
    icon: 'shapes-outline',
    color: moduleColors[6],
    lessons: [
      {
        id: 'l-07-01',
        title: 'Classes aur Objects',
        minutes: 8,
        summary: 'Real-world cheezon ko code mein model karna.',
        content: [
          'Class ek blueprint hoti hai objects banane ke liye. `class` keyword se define hoti hai. `__init__` method constructor hota hai, jo automatically chalta hai jab naya instance banta hai.',
          '`self` khud instance ko refer karta hai aur har instance method ka pehla parameter hona chahiye — Python ise automatically pass karta hai jab tum `obj.method()` call karte ho.',
          'Instance attributes `self` pe store hote hain (`self.name = name`) aur har object ke liye unique hote hain; class attributes saare instances ke beech shared hote hain.',
        ],
        examples: [
          { code: 'class Dog:\n    def __init__(self, name, breed):\n        self.name = name\n        self.breed = breed\n\n    def bark(self):\n        return f"{self.name} bolta hai Woof!"\n\nrex = Dog("Rex", "Labrador")\nprint(rex.bark())', output: 'Rex bolta hai Woof!' },
        ],
        keyPoints: [
          '`class Name:` objects ke liye ek blueprint define karta hai',
          '`__init__` constructor hai, jo instance banate waqt chalta hai',
          '`self` methods ke andar current instance ko refer karta hai',
          'Instance attributes `self.attr = value` se set hote hain',
        ],
        commonMistakes: [
          'Galti: Method define karte waqt `self` parameter bhool jana — Python error dega "missing 1 required positional argument".',
          'Confusion: Class attribute aur instance attribute mein farq na samajhna — class attribute saare instances mein shared hota hai, jo kabhi kabhi unexpected bugs deta hai.',
          'Quirk: `__init__` "constructor" kehlata hai lekin actually object create hone ke baad chalta hai, initialize karne ke liye — object banane ka kaam `__new__` karta hai (advanced topic).',
        ],
      },
      {
        id: 'l-07-02',
        title: 'Inheritance aur Polymorphism',
        minutes: 8,
        summary: 'Class hierarchies banao aur behavior share karo.',
        content: [
          'Ek class dusri class se inherit kar sakti hai `class Child(Parent):` se. Child ko parent ke saare methods/attributes milte hain aur wo unhe override ya extend kar sakta hai.',
          '`super()` parent class ka method call karta hai, aksar `__init__` mein use hota hai parent ki initialization logic reuse karne ke liye phir apna extra setup add karne ke liye.',
          'Polymorphism ka matlab hai different classes same method naam ko alag tareeqe se implement kar sakti hain — kisi bhi Animal subclass pe `.speak()` call karna kaam karta hai, har ek apna behavior deta hai.',
        ],
        examples: [
          { code: 'class Animal:\n    def __init__(self, name):\n        self.name = name\n    def speak(self):\n        return "..."\n\nclass Cat(Animal):\n    def speak(self):\n        return f"{self.name} bolta hai Meow!"\n\nc = Cat("Bhoora")\nprint(c.speak())', output: 'Bhoora bolta hai Meow!' },
          { code: 'class Employee:\n    def __init__(self, name, salary):\n        self.name = name\n        self.salary = salary\n\nclass Manager(Employee):\n    def __init__(self, name, salary, team_size):\n        super().__init__(name, salary)\n        self.team_size = team_size\n\nm = Manager("Dania", 90000, 5)\nprint(m.name, m.team_size)', output: 'Dania 5' },
        ],
        keyPoints: [
          '`class Child(Parent):` attributes aur methods inherit karta hai',
          '`super().__init__()` parent constructor call karta hai',
          'Method override karna parent ki implementation replace kar deta hai',
          'Polymorphism se alag classes ke objects ek jesa interface share kar sakte hain',
        ],
        commonMistakes: [
          'Galti: `super().__init__()` call karna bhool jana Child class ke `__init__` mein — parent ke attributes set hi nahi hote, AttributeError milega baad mein.',
          'Confusion: Multiple inheritance mein method resolution order (MRO) samajhna mushkil ho sakta hai — simple hierarchies pe focus karo pehle.',
          'Quirk: Python "duck typing" believe karta hai — agar object same method rakhta hai to inheritance zaroori nahi, "if it walks like a duck..." wala concept.',
        ],
      },
      {
        id: 'l-07-03',
        title: 'Encapsulation aur Properties',
        minutes: 7,
        summary: 'Apne object ke data ko control karo.',
        content: [
          'Python naming conventions se access control karta hai: single underscore `_attr` "internal use" signal karta hai, double underscore `__attr` name mangling trigger karta hai stronger privacy ke liye.',
          '`@property` decorator kisi method ko attribute-jese accessor mein badal deta hai, jisse get/set karte waqt validation logic add ho sakti hai lekin syntax clean rehta hai (`obj.value` instead of `obj.get_value()`).',
          'Ye tumhe validation ya computed logic add karne deta hai bina existing code todein jo attributes ko directly access karta hai.',
        ],
        examples: [
          { code: 'class BankAccount:\n    def __init__(self, balance):\n        self._balance = balance\n\n    @property\n    def balance(self):\n        return self._balance\n\n    @balance.setter\n    def balance(self, amount):\n        if amount < 0:\n            raise ValueError("Negative nahi ho sakta")\n        self._balance = amount\n\nacc = BankAccount(100)\nacc.balance = 250\nprint(acc.balance)', output: '250' },
        ],
        keyPoints: [
          '`_attr` "internal" signal karta hai, `__attr` name mangling trigger karta hai',
          '`@property` method ko read-only attribute ki tarah expose karta hai',
          '`@x.setter` controlled assignment allow karta hai validation ke sath',
          'Encapsulation internal state ko invalid values se bachata hai',
        ],
        commonMistakes: [
          'Galti: `@property` ke bina hi getter/setter methods likhna Java jese style mein — Python mein `@property` decorator zyada idiomatic aur clean hota hai.',
          'Confusion: Double underscore `__attr` ko "fully private" samajhna — actually ye name mangling karta hai (`_ClassName__attr` ban jata hai), completely inaccessible nahi hota.',
          'Quirk: Setter method ka naam property jesa hi hona chahiye (`@balance.setter` ke neeche `def balance(self, amount):`), warna AttributeError milega.',
        ],
      },
      {
        id: 'l-07-04',
        title: 'Magic Methods (Dunder Methods)',
        minutes: 6,
        summary: 'Built-ins ke sath apne objects ka behavior customize karo.',
        content: [
          'Dunder ("double underscore") methods tumhari classes ko Python ke built-in behavior ke sath integrate karne dete hain. `__str__` print() ka output define karta hai, `__repr__` debug representation, `__len__` len() ko power deta hai, `__eq__` `==` ko power deta hai.',
          'Operator overloading bhi is tarah kaam karta hai: `__add__` se define kar sakte ho `+` tumhare objects ke liye kya kare, jisse `vec1 + vec2` jesi intuitive syntax possible hoti hai.',
          'Isi waja se `len(my_list)`, `print(my_obj)`, aur `my_obj1 == my_obj2` jese cheezein Python mein consistently "just work" karti hain.',
        ],
        examples: [
          { code: 'class Vector:\n    def __init__(self, x, y):\n        self.x, self.y = x, y\n    def __add__(self, other):\n        return Vector(self.x + other.x, self.y + other.y)\n    def __str__(self):\n        return f"Vector({self.x}, {self.y})"\n\nv1 = Vector(1, 2)\nv2 = Vector(3, 4)\nprint(v1 + v2)', output: 'Vector(4, 6)' },
        ],
        keyPoints: [
          '`__str__` print()/str() ke output ko control karta hai',
          '`__len__` len(obj) ko power deta hai, `__eq__` obj1 == obj2 ko',
          '`__add__` aur iske jesa operator overloading enable karte hain',
          'Dunder methods custom objects ko built-ins jesa behavior dete hain',
        ],
        commonMistakes: [
          'Galti: `__str__` implement na karna — print(obj) se ajeeb output milta hai jese `<__main__.Vector object at 0x...>`.',
          'Confusion: `__str__` aur `__repr__` mein farak — `__str__` user-friendly output ke liye, `__repr__` developer/debug ke liye. Dono alag purpose serve karte hain.',
          'Quirk: `__eq__` define karne se `__hash__` automatically None ho jata hai — agar object ko set/dict key banana hai to `__hash__` bhi define karna padega.',
        ],
      },
    ],
    quiz: [
      { id: 'q-07-1', question: 'Class method mein `self` kya hai?', options: ['Ek global variable', 'Current instance', 'Class ka naam', 'Import ke liye keyword'], correctIndex: 1, explanation: 'self us instance ko refer karta hai jis pe method call hua hai.' },
      { id: 'q-07-2', question: 'super().__init__() kya karta hai?', options: ['Parent class delete karta hai', 'Parent class constructor call karta hai', 'Naya subclass banata hai', 'Initialization skip karta hai'], correctIndex: 1, explanation: 'Ye parent class ka __init__ call karta hai, uski setup logic reuse karne ke liye.' },
      { id: 'q-07-3', question: 'Kaunsa decorator method ko read-only attribute jesa banata hai?', options: ['@staticmethod', '@classmethod', '@property', '@getter'], correctIndex: 2, explanation: '@property method ko attribute-style access se expose karta hai.' },
      { id: 'q-07-4', question: 'print() ka output customize karne wala dunder method kaunsa hai?', options: ['__print__', '__str__', 'sirf __repr__', '__display__'], correctIndex: 1, explanation: '__str__ print() aur str() se dikhne wala string define karta hai.' },
    ],
  },
  {
    id: 'mod-08',
    order: 8,
    title: 'Error Handling — Galtiyan Sambhalo',
    subtitle: 'Robust, crash-resistant code likho',
    icon: 'warning-outline',
    color: moduleColors[7],
    lessons: [
      {
        id: 'l-08-01',
        title: 'try / except / finally',
        minutes: 7,
        summary: 'Runtime errors ko gracefully handle karna.',
        content: [
          'Risky code ko `try` block mein daalo; agar exception aaye to control matching `except` block mein chala jata hai, program crash nahi hota.',
          'Specific exception types catch kar sakte ho (ValueError, ZeroDivisionError, KeyError, waghera) ya bare `except` se kuch bhi catch kar sakte ho (generally recommend nahi kiya jata).',
          '`finally` hamesha chalta hai, chahe exception aaya ho ya nahi — files close karne ya connections clean karne ke liye perfect. `else` sirf tab chalta hai jab koi exception na aaya ho.',
        ],
        examples: [
          { code: 'try:\n    result = 10 / 0\nexcept ZeroDivisionError:\n    print("Zero se divide nahi kar sakte!")\nfinally:\n    print("Try khatam hui.")', output: 'Zero se divide nahi kar sakte!\nTry khatam hui.' },
          { code: 'try:\n    num = int(input("Number likho: "))\nexcept ValueError:\n    print("Ye valid number nahi hai!")\nelse:\n    print(f"Tum ne {num} likha")', output: 'Number likho: abc\nYe valid number nahi hai!' },
        ],
        keyPoints: [
          'try/except exceptions ko program crash karne se rokta hai',
          'Jahan mumkin ho specific exception types catch karo',
          '`finally` hamesha chalta hai, cleanup code ke liye',
          '`else` sirf tab chalta hai jab try mein koi exception na aaya ho',
        ],
        commonMistakes: [
          'Galti: Bare `except:` (bina exception type ke) use karna — ye har error ko silently catch kar leta hai, debugging bohat mushkil ho jati hai.',
          'Confusion: `finally` ko sirf error case ke liye samajhna — ye hamesha chalta hai, success ho ya fail.',
          'Quirk: Multiple except blocks likh sakte ho different exceptions ke liye — Python pehla matching wala use karta hai, order matter karta hai.',
        ],
      },
      {
        id: 'l-08-02',
        title: 'Apni Exceptions Raise Karna',
        minutes: 6,
        summary: 'Apne code mein jaan-boojh kar error signal karna.',
        content: [
          '`raise ExceptionType("message")` use kar ke jaan-boojh kar exception trigger kar sakte ho — function arguments validate karne ya business rules enforce karne ke liye useful.',
          'Apni custom exception classes bana sakte ho `Exception` se inherit kar ke, jisse tumhare errors specific, descriptive types ke hote hain jo callers precisely catch kar sakte hain.',
          '`from` clause (`raise NewError from original_error`) original traceback context preserve karta hai, jab lower-level errors ko wrap kar rahe ho tab useful hai.',
        ],
        examples: [
          { code: 'def withdraw(balance, amount):\n    if amount > balance:\n        raise ValueError("Balance kam hai")\n    return balance - amount\n\ntry:\n    withdraw(100, 150)\nexcept ValueError as e:\n    print(f"Error: {e}")', output: 'Error: Balance kam hai' },
          { code: 'class InsufficientFundsError(Exception):\n    pass\n\nraise InsufficientFundsError("Balance bohat kam hai")', output: 'Traceback (most recent call last):\n...\n__main__.InsufficientFundsError: Balance bohat kam hai' },
        ],
        keyPoints: [
          '`raise ExceptionType("msg")` demand pe exception trigger karta hai',
          'Custom exceptions built-in `Exception` class se inherit karte hain',
          '`as e` exception object ko capture kar leta hai inspection ke liye',
          'Custom exceptions callers ke liye error handling zyada precise banate hain',
        ],
        commonMistakes: [
          'Galti: Generic `Exception` raise karna specific type ki jaga — caller ko pata nahi chalta exactly kya galat hua, ValueError/TypeError jesi specific classes use karo.',
          'Confusion: `raise` aur `return` mein farak — raise turant function ko rok deta hai aur exception propagate karta hai, return normal value deta hai.',
          'Quirk: Custom exception class mein `pass` likhna kaafi hai agar extra behavior nahi chahiye — `Exception` se saari functionality already inherit ho jati hai.',
        ],
      },
      {
        id: 'l-08-03',
        title: 'Common Built-in Exceptions Pehchano',
        minutes: 5,
        summary: 'Samjho har error type ka matlab kya hai.',
        content: [
          'ValueError: sahi type ki galat value (`int("abc")`). TypeError: galat type pe operation (`1 + "a"`). IndexError: list index range se bahar. KeyError: dict mein missing key.',
          'AttributeError: object mein wo attribute/method hi nahi hai. FileNotFoundError: file exist nahi karti. ZeroDivisionError: zero se divide karna. ImportError/ModuleNotFoundError: module missing hai.',
          'Traceback ko neeche se upar padhna quickly bata deta hai exception type aur message, aur upar ki lines call stack dikhati hain jo error tak le kar aaya.',
        ],
        examples: [
          { code: 'data = {"a": 1}\ntry:\n    print(data["b"])\nexcept KeyError as e:\n    print(f"Missing key: {e}")', output: "Missing key: 'b'" },
        ],
        keyPoints: [
          'ValueError vs TypeError: galat value vs galat type',
          'IndexError (sequences) vs KeyError (dictionaries)',
          'AttributeError ka matlab hai object mein wo method/property hi nahi',
          'Tracebacks neeche se upar padho: exception type, phir message, phir call stack',
        ],
        commonMistakes: [
          'Galti: Har jagah generic `except Exception:` use karna — specific exception type catch karna behtar hai taake kis type ka error hai wo clear rahe.',
          'Confusion: TypeError aur ValueError mein confuse hona — `"5" + 5` TypeError deta hai (galat type), `int("abc")` ValueError deta hai (sahi type, galat value).',
          'Quirk: KeyError ka message sirf missing key show karta hai (quotes ke sath), poora sentence nahi — `str(e)` se sirf key milegi.',
        ],
      },
    ],
    quiz: [
      { id: 'q-08-1', question: 'Kaunsa block hamesha chalta hai, error ho ya na ho?', options: ['try', 'except', 'finally', 'else'], correctIndex: 2, explanation: 'finally hamesha execute hota hai, exception aaye ya na aaye.' },
      { id: 'q-08-2', question: 'int("abc") kaunsa exception raise karta hai?', options: ['TypeError', 'ValueError', 'NameError', 'KeyError'], correctIndex: 1, explanation: '"abc" valid string hai lekin int() ke liye invalid value hai, isliye ValueError.' },
      { id: 'q-08-3', question: 'Missing dict key access karne pe (dict[key] se) kaunsa error aata hai?', options: ['IndexError', 'AttributeError', 'KeyError', 'ValueError'], correctIndex: 2, explanation: 'KeyError missing dictionary keys ke liye raise hota hai.' },
      { id: 'q-08-4', question: 'Jaan-boojh kar exception kaise trigger karte hain?', options: ['throw Exception()', 'raise Exception("msg")', 'except Exception', 'error("msg")'], correctIndex: 1, explanation: '`raise` keyword Python mein exception trigger karta hai.' },
    ],
  },
  {
    id: 'mod-09',
    order: 9,
    title: 'Modules aur File I/O',
    subtitle: 'Code organize karo aur files ke sath kaam karo',
    icon: 'folder-open-outline',
    color: moduleColors[8],
    lessons: [
      {
        id: 'l-09-01',
        title: 'Modules aur Packages Import Karna',
        minutes: 7,
        summary: 'Standard library aur uske aage se code reuse karo.',
        content: [
          'Module koi bhi `.py` file hoti hai; `import module_name` se import karo aur dot notation se access karo. `from module import name` specific cheezein directly import karta hai.',
          'Python ki standard library mein powerful built-in modules hain: math, random, datetime, os, json, collections, aur bohat kuch — bina install kiye.',
          'Third-party packages pip se install hote hain (`pip install package_name`) PyPI (Python Package Index) se, jo duniya ka sabse bara open-source Python code repository hai.',
        ],
        examples: [
          { code: 'import math\nprint(math.sqrt(16))\nprint(math.pi)', output: '4.0\n3.141592653589793' },
          { code: 'import random\nprint(random.randint(1, 6))  # dice roll simulate ho raha hai', output: '4', caption: 'Output har baar different aayega, kyunki random hai' },
          { code: 'from datetime import datetime\nnow = datetime.now()\nprint(now.year)', output: '2024' },
        ],
        keyPoints: [
          '`import module` phir `module.function()` se access karo',
          '`from module import name` seedha tumhare namespace mein import karta hai',
          'Standard library mein math, random, datetime, os, json waghera shamil hain',
          '`pip install package_name` se PyPI se third-party packages milte hain',
        ],
        commonMistakes: [
          'Galti: File ka naam standard module se same rakhna (jese apni file ko `math.py` bana dena) — Python confuse ho jati hai kaunsa import karna hai.',
          'Confusion: `from module import *` use karna — ye sab kuch import kar leta hai, namespace pollute ho jata hai aur pata nahi chalta kaunsi function kahan se aayi.',
          'Quirk: Module sirf pehli dafa import hone pe run hota hai; dobara import karne pe cached version use hota hai (fast hota hai lekin agar file change ki ho to reflect nahi hoti bina restart ke).',
        ],
      },
      {
        id: 'l-09-02',
        title: 'Files Read aur Write Karna',
        minutes: 8,
        summary: '`with` statement se disk pe data persist karna.',
        content: [
          '`open(filename, mode)` se file open hoti hai: "r" read, "w" write (overwrite kar deta hai), "a" append, "r+" read/write. Hamesha `with` block use karo taake file automatically close ho jaye, chahe error hi kyun na aaye.',
          '`.read()` poori file ek string ki tarah return karta hai, `.readline()` ek line read karta hai, `.readlines()` lines ki list return karta hai. `.write(text)` string likhta hai; newlines ke liye manually `\\n` use karo.',
          'File object pe direct iterate karna (`for line in file:`) bade files ke liye memory-efficient hai kyunki ek time pe ek line hi read hoti hai.',
        ],
        examples: [
          { code: 'with open("notes.txt", "w") as f:\n    f.write("Salam\\nPython\\n")\n\nwith open("notes.txt", "r") as f:\n    content = f.read()\nprint(content)', output: 'Salam\nPython' },
          { code: 'with open("notes.txt", "a") as f:\n    f.write("Aur bhi\\n")\n\nwith open("notes.txt") as f:\n    for line in f:\n        print(line.strip())', output: 'Salam\nPython\nAur bhi' },
        ],
        keyPoints: [
          '`with open(...) as f:` file ko safely auto-close kar deta hai',
          'Modes: "r" read, "w" write/overwrite, "a" append',
          '`.read()`, `.readline()`, `.readlines()` alag alag granularity dete hain',
          'File object ko line-by-line iterate karna memory efficient hai',
        ],
        commonMistakes: [
          'Galti: "w" mode use karna jab actually append chahiye tha — "w" purani file ka poora data delete kar deta hai! "a" use karo agar add karna hai.',
          'Confusion: `with` statement use na karna aur manually `.close()` bhool jana — file open reh jati hai, resources leak ho sakte hain.',
          'Quirk: Windows aur Mac/Linux mein file paths ke liye backslash `\\` vs forward slash `/` ka farak hota hai — `os.path.join()` ya `pathlib` use karo cross-platform code ke liye.',
        ],
      },
      {
        id: 'l-09-03',
        title: 'JSON Ke Sath Kaam Karna',
        minutes: 6,
        summary: 'Python data ko storage/APIs ke liye serialize karo.',
        content: [
          'JSON (JavaScript Object Notation) data interchange ka standard format hai, khaas kar web APIs ke sath. Python ka built-in `json` module JSON text aur Python objects ke beech convert karta hai.',
          '`json.dumps(obj)` Python object (dict/list) ko JSON string mein convert karta hai; `json.loads(text)` JSON text ko wapas Python objects mein parse karta hai. `json.dump()`/`json.load()` seedha file objects ke sath kaam karte hain.',
          'JSON types Python ke closely map hote hain: objects↔dict, arrays↔list, strings/numbers/booleans direct map hote hain, aur null↔None.',
        ],
        examples: [
          { code: 'import json\ndata = {"name": "Ana", "age": 25, "active": True}\ntext = json.dumps(data)\nprint(text)', output: '{"name": "Ana", "age": 25, "active": true}' },
          { code: 'import json\ntext = \'{"score": 99, "tags": ["py", "mazedar"]}\'\nparsed = json.loads(text)\nprint(parsed["tags"])', output: "['py', 'mazedar']" },
        ],
        keyPoints: [
          '`json.dumps()`/`loads()` JSON string aur Python ke beech convert karte hain',
          '`json.dump()`/`load()` seedha files ke sath kaam karte hain',
          'dict↔object, list↔array, True/False↔true/false, None↔null',
          'JSON REST APIs aur config files ka standard format hai',
        ],
        commonMistakes: [
          'Galti: `json.dumps()` aur `json.dump()` mein confuse hona — dumps() string deta hai, dump() seedha file mein likhta hai. Dono alag hain.',
          'Confusion: Python `True`/`False`/`None` JSON mein `true`/`false`/`null` (lowercase) ban jate hain — parsing ke waqt case ka khayal rakho.',
          'Quirk: JSON tuples support nahi karta — Python tuple ko JSON mein convert karoge to wo automatically array/list ban jayega.',
        ],
      },
    ],
    quiz: [
      { id: 'q-09-1', question: 'pip install kya karta hai?', options: ['Python compile karta hai', 'PyPI se third-party packages install karta hai', 'Code format karta hai', 'Unit tests chalata hai'], correctIndex: 1, explanation: 'pip Python Package Index pe publish hue packages install karta hai.' },
      { id: 'q-09-2', question: '`with open(...) as f:` kyun use karte hain?', options: ['Ye fast hai', 'File ko safely auto-close karta hai', 'Read karne ke liye zaroori hai', 'File encrypt karta hai'], correctIndex: 1, explanation: 'with statement ensure karta hai file close ho jaye, error aaye ya na aaye.' },
      { id: 'q-09-3', question: 'Python dict ko JSON string mein convert karne wala function kaunsa hai?', options: ['json.loads()', 'json.dumps()', 'json.parse()', 'json.stringify()'], correctIndex: 1, explanation: 'json.dumps() Python objects ko JSON text mein serialize karta hai.' },
      { id: 'q-09-4', question: 'Kaunsa file mode overwrite kiye bina append karta hai?', options: ['"r"', '"w"', '"a"', '"x"'], correctIndex: 2, explanation: '"a" mode existing file ke end mein naya content add karta hai.' },
    ],
  },
  {
    id: 'mod-10',
    order: 10,
    title: 'Advanced Python',
    subtitle: 'Iterators, decorators aur real projects',
    icon: 'sparkles-outline',
    color: moduleColors[9],
    lessons: [
      {
        id: 'l-10-01',
        title: 'Iterators aur Generators',
        minutes: 8,
        summary: 'Lazy, memory-efficient iteration.',
        content: [
          'Iterator koi bhi object hota hai jo `__iter__` aur `__next__` implement karta hai. Generator ek simple tareeqa hai iterators banane ka functions use kar ke jahan `return` ki jaga `yield` keyword use hota hai.',
          'Poori list return karne ki bajaye, `yield` values ek ek kar ke produce karta hai aur unke beech execution pause kar deta hai — bade ya infinite sequences ke liye bohat zyada memory-efficient.',
          'Generator expressions list comprehensions jesi lagti hain lekin parentheses ke sath: `(x**2 for x in range(1000000))` values ko lazily compute karta hai on-demand, poori list pehle se bana kar nahi.',
        ],
        examples: [
          { code: 'def countdown(n):\n    while n > 0:\n        yield n\n        n -= 1\n\nfor num in countdown(3):\n    print(num)', output: '3\n2\n1' },
          { code: 'squares = (x**2 for x in range(5))\nprint(list(squares))', output: '[0, 1, 4, 9, 16]' },
        ],
        keyPoints: [
          '`yield` ek generator banata hai jo values lazily produce karta hai',
          'Generators poori lists banane se bohat kam memory use karte hain',
          'Generator expressions `[]` ki jaga `()` use karte hain',
          'Ek dafa khatam ho jaye to generator dobara restart/reuse nahi ho sakta',
        ],
        commonMistakes: [
          'Galti: Generator ko dobara loop karne ki koshish karna — ek dafa consume hone ke baad wo khatam ho jata hai, dobara data nahi milega.',
          'Confusion: `return` aur `yield` mein confuse hona — return function ko khatam kar deta hai, yield pause kar ke value deta hai aur agli call pe wahi se continue karta hai.',
          'Quirk: Generator function call karne pe function body turant execute nahi hota — sirf generator object banta hai, code tab chalta hai jab tum `next()` ya loop karte ho.',
        ],
      },
      {
        id: 'l-10-02',
        title: 'Decorators',
        minutes: 8,
        summary: 'Functions ko wrap kar ke behavior add karna.',
        content: [
          'Decorator ek function hota hai jo dusre function ko leta hai aur uska behavior extend karta hai bina uska code directly modify kiye. `@decorator_name` syntax se function definition ke upar apply hota hai.',
          'Common uses: logging, timing execution, caching (`functools.lru_cache`), authentication checks, aur retry logic — sab bina core function ko messy banaye.',
          '`functools.wraps` original function ka naam aur docstring preserve karta hai jab usse wrap kiya jaye, ye best practice hai well-behaved decorators ke liye.',
        ],
        examples: [
          { code: 'import time\n\ndef timer(func):\n    def wrapper(*args, **kwargs):\n        start = time.time()\n        result = func(*args, **kwargs)\n        print(f"{func.__name__} ne {time.time()-start:.4f}s liye")\n        return result\n    return wrapper\n\n@timer\ndef slow_add(a, b):\n    time.sleep(0.1)\n    return a + b\n\nslow_add(2, 3)', output: 'slow_add ne 0.1002s liye' },
        ],
        keyPoints: [
          '`@decorator` syntax function ko extra behavior ke sath wrap karta hai',
          'Decorators commonly logging, timing, caching, auth handle karte hain',
          '`*args, **kwargs` se wrapper kisi bhi function signature ko support karta hai',
          '`functools.wraps` original function ka metadata preserve karta hai',
        ],
        commonMistakes: [
          'Galti: Decorator ke andar `return wrapper` bhool jana — decorator None return karega aur original function completely gum ho jayega.',
          'Confusion: Decorator ko function call karte waqt bracket lagana `@timer()` jab simple decorator ke liye sirf `@timer` chahiye — brackets tab lagte hain jab decorator khud arguments leta ho.',
          'Quirk: `functools.wraps` use na karna — decorated function ka `__name__` "wrapper" ban jata hai, debugging aur documentation mein confusion hoti hai.',
        ],
      },
      {
        id: 'l-10-03',
        title: 'Virtual Environments aur pip',
        minutes: 6,
        summary: 'Project dependencies ko cleanly isolate karo.',
        content: [
          'Virtual environment ek isolated Python installation hoti hai single project ke liye, jo different projects ke beech dependency version conflicts se bachati hai.',
          '`python3 -m venv venv` se banao, activate karo (`source venv/bin/activate` Mac/Linux pe, `venv\\Scripts\\activate` Windows pe), phir uske andar pip install karo packages.',
          '`requirements.txt` project ki dependencies list karta hai (`pip freeze > requirements.txt` se generate karo, `pip install -r requirements.txt` se kahin aur install karo).',
        ],
        examples: [
          { code: 'python3 -m venv venv\nsource venv/bin/activate\npip install requests\npip freeze > requirements.txt', output: '(venv) $ ', caption: 'Activate hone ke baad prompt pe (venv) show hota hai' },
        ],
        keyPoints: [
          'Virtual environments per-project dependencies isolate karte hain',
          '`python3 -m venv venv` banata hai; `activate` use enable karta hai',
          '`requirements.txt` exact package versions track karta hai reproducibility ke liye',
          'Real projects mein hamesha virtual environment use karo',
        ],
        commonMistakes: [
          'Galti: Venv activate karna bhool jana aur globally packages install kar dena — system-wide Python ganda ho jata hai, conflicts create hote hain.',
          'Confusion: Venv folder ko Git mein commit kar dena — venv folder ko `.gitignore` mein daalo, sirf requirements.txt commit karo.',
          'Quirk: Har project ke liye alag venv chahiye — ek hi venv sab projects ke liye use karna waapis wahi purani problem create kar deta hai jo venv solve karne ke liye bana tha.',
        ],
      },
      {
        id: 'l-10-04',
        title: 'Mini Project: Data Pipeline',
        minutes: 10,
        summary: 'Sab kuch combine kar ke ek working script banao.',
        content: [
          'Chalo ek chhota pipeline banate hain: students ke records ki list read karo, unhe filter/transform karo, aur summary output karo — functions, comprehensions, dicts, aur error handling sab ek sath use karte hue.',
          'Ye real-world scripts jesa hai: data load karo (file ya API se practically), process karo, aur report generate karo. Dekho kaise har purana concept — functions, loops, dicts, f-strings — naturally combine ho raha hai.',
          'Khud try karo isko extend karna: actual JSON file se read karo, aur statistics add karo, ya report ko naye file mein wapas likho.',
        ],
        examples: [
          { code: 'students = [\n    {"name": "Ana", "scores": [90, 85, 95]},\n    {"name": "Bilal", "scores": [70, 65, 80]},\n    {"name": "Sara", "scores": [88, 92, 79]},\n]\n\ndef average(scores):\n    return sum(scores) / len(scores)\n\ndef report(students):\n    for s in students:\n        avg = average(s["scores"])\n        status = "Pass" if avg >= 75 else "Mehnat Karo"\n        print(f"{s[\'name\']}: {avg:.1f} avg — {status}")\n\nreport(students)', output: 'Ana: 90.0 avg — Pass\nBilal: 71.7 avg — Mehnat Karo\nSara: 86.3 avg — Pass' },
        ],
        keyPoints: [
          'Real scripts functions, loops, dicts, aur conditionals ko combine karte hain',
          'Problems ko chhote, testable functions mein break karo',
          'f-strings `:.1f` se decimals clean format hote hain reports ke liye',
          'Ye pattern (load → process → report) almost kisi bhi data task pe generalize ho jata hai',
        ],
        commonMistakes: [
          'Galti: Poori logic ek hi bare function mein likh dena — chhote functions mein break karo, testing aur debugging asaan ho jati hai.',
          'Confusion: Data validate na karna (jese empty scores list) — `average([])` ZeroDivisionError dega, hamesha edge cases handle karo.',
          'Quirk: Real projects mein data hamesha "clean" nahi hoti — missing keys, wrong types waghera handle karne ke liye try/except aur `.get()` use karna zaroori hai.',
        ],
      },
    ],
    quiz: [
      { id: 'q-10-1', question: 'Kaunsa keyword function ko generator bana deta hai?', options: ['return', 'yield', 'generate', 'async'], correctIndex: 1, explanation: 'yield ek value produce kar ke pause karta hai, function generator ban jata hai.' },
      { id: 'q-10-2', question: 'Function pe decorator apply karne ka syntax kya hai?', options: ['#decorator', '@decorator upar def se', 'sirf decorator(func) inline', 'use decorator;'], correctIndex: 1, explanation: 'Function definition ke upar @decorator_name likhna usse apply kar deta hai.' },
      { id: 'q-10-3', question: 'Virtual environment banane ka command kya hai?', options: ['pip venv create', 'python3 -m venv venv', 'python new-env', 'venv --init'], correctIndex: 1, explanation: 'python3 -m venv venv naya isolated environment folder banata hai.' },
      { id: 'q-10-4', question: 'Generator expressions lists se kya faida dete hain?', options: ['Likhna hamesha fast hai', 'Values lazily compute karte hain, memory bachate hain', 'Zyada data types support karte hain', 'Iterate nahi ho sakte'], correctIndex: 1, explanation: 'Generators values on-demand produce karte hain, sab kuch memory mein store nahi karte.' },
    ],
  },
];

export function getModuleById(id: string): Module | undefined {
  return modules.find((m) => m.id === id);
}

export function getLessonById(lessonId: string): { lesson: Module['lessons'][0]; module: Module } | undefined {
  for (const mod of modules) {
    const lesson = mod.lessons.find((l) => l.id === lessonId);
    if (lesson) return { lesson, module: mod };
  }
  return undefined;
}

export function totalLessonsCount(): number {
  return modules.reduce((sum, m) => sum + m.lessons.length, 0);
}

export function getNextLesson(currentLessonId: string): { lesson: Module['lessons'][0]; module: Module } | undefined {
  const flat: { lesson: Module['lessons'][0]; module: Module }[] = [];
  modules.forEach((m) => m.lessons.forEach((l) => flat.push({ lesson: l, module: m })));
  const idx = flat.findIndex((f) => f.lesson.id === currentLessonId);
  if (idx === -1 || idx === flat.length - 1) return undefined;
  return flat[idx + 1];
}

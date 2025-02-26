# My Cosmos 프로젝트

> [Github Pages 바로가기](https://jinsk9268.github.io/my-cosmos/)

<br/>

## 프로젝트 개요

**My Cosmos**는 사용자가 입력한 문자열(이름)을 바탕으로 은하를 시각화한 프로젝트 입니다.
이 프로젝트는 **WebGL2, Canvas API**를 사용해 3D 기반 에니메이션 효과를 구현했습니다.

<br/>

## 기능

- **은하 효과** : 캔버스 2D로 사용자가 입력한 텍스트를 그려 WebGL2에서 텍스쳐로 사용해 에니메이션 진행.
- **마우스, 터치 이벤트** : 마우스, 모바일 터치에 따라 카메라 회전 적용.
- **hash 기반 화면 이동** : window.location.hash를 활용한 간단한 라우팅 적용.

```plaintext
my-cosmos/
├── home-background/        # iframe 적용된 홈화면 로직, 셰이더 모음
│   ├── shaders/            # 오로라, 별 셰이더 정의
│   └── homeBackground.js   # 홈화면 관련 로직 모음
├── js/                     # 핵심 로직이 포함된 자바스크립트 파일들
│   ├── canvas/             # Canvas 설정과 WebGL2, 텍스쳐 Canvas 관련 로직 모음
│   ├── events              # 카메라, 화면에서 발생하는 이벤트 로직 모음
│   ├── gl/                 # WebGL2 관련 로직 모음
│   ├── shape/              # 은하 모양 모음
│   └── 공통 설정           # 상수, 상태관리, 공통 함수 등 공통 사용 관련 로직 모음
├── style/                  # scss 파일 모음
├── shaders/                # 코스모스 화면에 쓰이는 셰이더 모음
├── index.html              # 프로젝트의 진입 HTML 파일
├── home-background.html    # iframe 적용할 HTML 파일
├── index.js                # 프로젝트 초기화 및 주요 로직 생성
└── 패키지, 빌드 설정       # 패키지 관리, 빌드 설정
```

<br/>

## 프로젝트 실행

**1. Repository Clone**

```bash
git clone https://github.com/jinsk9268/my-cosmos.git
cd my-cosmos
```

**2. 의존성 설치**

```bash
npm install
```

**3. 개발 모드 실행**

```bash
npm run dev
```

## 프로젝트 진행 과정

### 1. Canvas, WebGL2 설정

- Canvas, WebGL2 초기화 로직 설정.

### 2. 홈 배경화면 Rendering

- WebGL2로 홈 배경화면을 페르마 나선 형태를 적용한 별과 노이즈 함수 적용한 배경 설정

### 3. 사용자가 입력한 글자를 바탕으로 Canvas 2D 텍스쳐 생성

- 사용자가 입력한 글자를 바탕으로 Canvas 2D에 글자를 그려 텍스쳐로 사용

### 4. 설정된 은하 모양 바탕으로 좌표 생성 및 텍스쳐 렌더링

- 랜덤으로 선택된 은하 모양을 바탕으로 좌표 생성 및 만들어진 Texture 배열을 렌더링

### 5. 마우스, 화면 터치 이벤트 설정

- 마우스, 화면 터치 이벤트 설정하여 화면 이동, 줌인, 줌아웃 설정

### 6. Hash 기반 화면 전환

- URL의 hash 값을 통해 화면 상태 관리.

<br/>

## 기술 스택

- **HTML5 / Javascript / SCSS** : 프로젝트 기본 구조와 스타일링
- **Canvas API** : 2D 그래픽 애니메이션 구현
- **WebGL2 API** : 3D 그래픽 애니메이션 구현
- **Vite** : 경량화된 빌드 및 개발 환경 설정
- **zustand** : zustand로 상태 관리
- **gl-matrix** : gl-matrix로 카메라 및 화면 설정
- **simplex-noise** : 노이즈 생성

## 실행 화면

<br/>

# 추가 자료

- [Github Repo](https://github.com/jinsk9268/my-cosmos)

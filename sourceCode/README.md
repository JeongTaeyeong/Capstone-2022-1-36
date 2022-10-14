
----- 1. vueJS 빌드 방법 -----

# public_interest_activities

> public_interest_activities_NFT_issuance

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# # build for production with minification
# npm run build
# ```

For detailed explanation on how things work, consult the [docs for vue-loader](http://vuejs.github.io/vue-loader).

----------------------------


----- 2. 각 폴더별 페이지 -----

auth_account: 로그인 페이지 + 회원가입 전 계정 구분 페이지 + 계정별 회원가입 페이지

auth_apply:   권한 신청 페이지(NFT 목록)

main:         메인 페이지

manage_page:  관리자 전용 페이지

mypage:       마이 페이지(개인정보 표시)

nft_choice:   권한 있는 경우, 발급할 NFT 선택 페이지

user_search:  NFT 발급할 사용자 선택 페이지

nft_issue:    NFT 발급을 위한 파일 첨부 페이지

ranking:      랭킹 페이지

vms_ins:      봉사시간 갱신 페이지 (vms 발급번호 입력 or 파일 첨부)

progress:     진행 정보 페이지

------------------------------


----- 3. 로컬터널 이용해서 서버 여는법-----

npm 에서 localtunnel 설치 (-g)

명령프롬프트 해당 폴더에서 yarn start로 백엔드 서버 열기, npm run dev로 프론트 서버 열기

명령프롬프트 추가로 2개의 창을 열어서 lt -p 4000 -s pchapi 명령어로 백엔드 서버 터널 열기,
lt -p 8080 -s pchain 으로 프론트 서버 터널 열기

인터넷 브라우저로 pchapi.loca.lt 들어가서 localtunnel 주의사항 페이지에서 버튼 클릭, pchain.loca.lt들어가서 버튼 클릭

------------------------------------------

----- 4. .env 추가해야 할 것 -----
SITE=https://pchain.loca.lt
VUE_APP_SITE=https://pchain.loca.lt
VUE_APP_API_URL=https://pchapi.loca.lt

---------------------------------

----- 5. URL 변경 시 -----

.env URL 변경

Google Oauth URL 변경
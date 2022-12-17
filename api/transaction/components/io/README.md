# Transaction API Endpoints

This folder contains API specification for Transaction API endpoints

The transaction APIs can be classified into three groups:-

1. BPP API
2. BAP API
3. BG API


The BPP API endpoints are:

1. `search` : Search.yaml
2. `select` : Select.yaml
3. `init` : Init.yaml
4. `confirm` : Confirm.yaml
5. `status` : Status.yaml
6. `update` : Update.yaml
7. `track` : Track.yaml
8. `cancel` : Cancel.yaml
9. `rating` : Rating.yaml
10. `support` : Support.yaml

The BAP API endpoints are:

1. `on_search` : OnSearch.yaml
2. `on_select` : OnSelect.yaml
3. `on_init` : OnInit.yaml
4. `on_confirm` : OnConfirm.yaml
5. `on_status` : OnStatus.yaml
6. `on_update` : OnUpdate.yaml
7. `on_track` : OnTrack.yaml
8. `on_cancel` : OnCancel.yaml
9. `on_rating` : OnRating.yaml
10. `on_support` : OnSupport.yaml

The BG API endpoints are:

1. `search` : Search.yaml
2. `on_search` _(Only supported till version 0.9.3)_ : OnSearch.yaml. From 1.x, BPPs will call BAPs' `on_search` endpoint directly. 

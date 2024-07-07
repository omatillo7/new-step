<script setup lang="ts">
import flag1 from "@/assets/flag/uzb.svg";
import flag3 from "@/assets/flag/ru.svg";
import AccountService from "@/services/account";
import { ref } from "vue";
import { ILanguageList } from "@/types/base";

const languageList = ref<ILanguageList[]>([
	{
		code: "ru",
		shortName: "Ру",
		fullName: "Русский",
		value: 1,
		text: "Русский",
		orderCode: null,
		avatar: flag3,
	},
	// {
	//   code: "uz-cyrl",
	//   shortName: "Ўз",
	//   fullName: "Ўзбекча",
	//   value: 2,
	//   text: "Ўзбекча",
	//   orderCode: null,
	//   avatar: flag2,
	// },
	{
		code: "uz-latn",
		shortName: "O`z",
		fullName: "O`zbekcha",
		value: 3,
		text: "O`zbekcha",
		orderCode: null,
		avatar: flag1,
	},
]);

const language = localStorage.getItem("lang") || 1;

function SetLang(lang: ILanguageList) {
	localStorage.setItem("lang", lang.value + "");
	AccountService.ChangeLanguage({ languageId: lang.value }).then(() => {
		window.location.reload();
	});
}
</script>
<template>
	<!-- ---------------------------------------------- -->
	<!-- language DD -->
	<!-- ---------------------------------------------- -->
	<v-menu :close-on-content-click="false" location="bottom" class="language_dropdown">
		<template v-slot:activator="{ props }">
			<v-btn icon size="small" v-bind="props">
				<v-avatar size="22" class="position-relative">
					<template v-for="langs in languageList">
						<img v-if="language === langs.value + ''" :src="langs.avatar" :alt="langs.code" width="50" height="50" class="obj-cover" />
						<img v-if="!language" :src="flag1" width="50" height="50" class="obj-cover" />
					</template>
				</v-avatar>
				<div class="main-lang">
					<template v-for="itm in languageList">
						<span v-if="language === itm.value + ''" offset-x="-4" offset-y="-6">{{ itm.shortName }}</span>
					</template>
				</div>
			</v-btn>
		</template>
		<v-sheet rounded="md" width="200" elevation="10">
			<v-list class="theme-list">
				<v-list-item v-for="item in languageList" @click="SetLang(item)">
					<template v-slot:prepend>
						<v-avatar size="22">
							<img :src="item.avatar" :alt="item.avatar" width="50" height="50" class="obj-cover" />
						</v-avatar>
					</template>
					<v-list-item-title class="text-subtitle-1 font-weight-regular">
						{{ item.fullName }}
						<span class="text-disabled text-subtitle-1 pl-2">({{ item.shortName }})</span>
					</v-list-item-title>
				</v-list-item>
			</v-list>
		</v-sheet>
	</v-menu>
</template>
<style lang="scss">
.main-lang {
	position: absolute;
	top: -2px;
	left: 25px;
}
</style>

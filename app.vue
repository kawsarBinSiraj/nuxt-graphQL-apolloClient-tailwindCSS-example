<script setup>
import { reactive, ref } from "vue";
import { queryForGettingPeo } from "./queries/getPeo";

const isLoading = ref(false);
const peo = ref([]);

const { data } = await useLazyAsyncQuery(queryForGettingPeo);
const { people } = data?._value;
if (people) peo.value = people.slice(0, 2);

const randomize = () => {
    isLoading.value = true;
    let r = 1 + Math.floor(Math.random() * people.length);
    let v = people.slice(r, people.length);
    peo.value = v.slice(0, 2);
    setTimeout(() => (isLoading.value = false), 600);
};
</script>

<template>
    <div id="app">
        <div class="container mx-auto my-10">
            <h1 class="text-2xl font-bold text-center mb-1">
                <span class="text-blue-400 p-1 border border-black rounded-sm"
                    >Nuxt.js</span
                >
                +
                <span class="text-lime-600 p-1 border border-black rounded-sm"
                    >GraphQL
                </span>
                +
                <span class="text-orange-600 p-1 border border-black rounded-sm"
                    >ApolloClient
                </span>
                +
                <span class="text-pink-400 p-1 border border-black rounded-sm"
                    >Tailwind CSS</span
                >
                - Example
            </h1>
            <p class="my-3 mt-6 text-center w-1/2 mx-auto">
                Apollo Client is a comprehensive state management library for
                JavaScript that enables you to manage both local and remote data
                with <strong class="text-orange-600">GraphQL</strong><br />
                <span class="inline-block font-bold font-mono">
                    <var>
                        Design & Developed by
                        <a
                            href="https://kawsarbinsiraj.github.io"
                            target="_blank"
                            class="inline-block mt-1 text-fuchsia-600"
                        >
                            @kawsarBinSiraj
                        </a>
                    </var>
                </span>
            </p>
            <div class="content-wrapper relative">
                <div
                    v-if="isLoading"
                    id="loader"
                    class="absolute inset-0 text-3xl grid place-items-center p-2 rounded-sm"
                >
                    Loading...
                </div>
                <div
                    class="flex flex-row justify-center items-center gap-2 mt-10 p-5 transition-opacity duration-75 ease-in-out"
                    :class="{ 'opacity-25': isLoading }"
                >
                    <div class="basis-1/4">
                        <div class="card-content text-center">
                            <div
                                v-for="({ name, image }, i) in peo"
                                :key="i"
                                class="people mb-2"
                            >
                                <img
                                    :src="image?.url"
                                    :alt="name"
                                    class="inline-block"
                                    style="width: 200px"
                                />
                            </div>
                        </div>
                    </div>
                    <div class="basis-1/2">
                        <div class="card-content">
                            <pre class="text-sm">
                        {{ peo }}
                      </pre
                            >
                            <button
                                type="button"
                                @click="randomize"
                                :disabled="isLoading"
                                class="ms-8 px-4 py-2 bg-lime-600 text-white rounded-sm"
                            >
                                Get Random Value with GraphQL
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

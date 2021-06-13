import { provide, inject, defineComponent } from 'vue'
import type { InjectionKey, DefineComponent, Slot } from 'vue'

const defaultKey = Symbol()

export type ContainerProviderProps<State = void> = {
    initialState?: State
}

type ProviderComponent<State = void> = DefineComponent<
    { initialState: State },
    Slot | undefined,
    unknown,
    {},
    {}
>

export type Container<Value, State = void> = {
    Provider: ProviderComponent<State>
    useProvider: (initialState?: State) => Value
    useContainer: () => Value
}

export const createContainer = <Value, State = void>(
    useService: (initialState?: State) => Value
): Container<Value, State> => {
    let key: InjectionKey<Value> = defaultKey

    const useProvider = (initialState?: State) => {
        key = Symbol()

        const service = useService(initialState)

        provide(key, service)

        return service
    }

    const Provider = defineComponent({
        props: {
            initialState: null as unknown as State
        },
        setup(props: ContainerProviderProps<State>, { slots, emit }) {
            useProvider(props?.initialState)

            return slots?.default
        }
    })

    const useContainer = () => {
        const value = inject(key)

        if (key === defaultKey) {
            throw new Error(
                'Component must be wrapped with Providedr component.'
            )
        }

        return value as Value
    }

    return { Provider, useProvider, useContainer }
}
